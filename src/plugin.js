import document from 'global/document';
import window from 'global/window';
import videojs from 'video.js';
import ContextMenuItem from './context-menu-item';
import {getPointerPosition, isDescendantOf} from './util';

const Menu = videojs.getComponent('Menu');
const CLASS_PREFIX = 'vjs-contextmenu-ui';

/**
 * Whether or not the player has an active context menu.
 *
 * @param  {Player} player
 * @return {Boolean}
 */
function hasMenu(player) {
  return player.hasOwnProperty('contextmenuUI') &&
    player.contextmenuUI.hasOwnProperty('menu') &&
    player.contextmenuUI.menu.el();
}

/**
 * Disposes the menu from a player if it hasn't already been disposed.
 *
 * @param  {Player} player
 */
function maybeDisposeMenu(player) {
  if (hasMenu(player)) {
    player.removeChild(player.contextmenuUI.menu);
    player.contextmenuUI.menu.dispose();
    delete player.contextmenuUI.menu;
  }
}

/**
 * Calculates the position of a menu based on the pointer position and player
 * size.
 *
 * @param  {Object} pointerPosition
 * @param  {Object} playerSize
 * @return {Object}
 */
function findMenuPosition(pointerPosition, playerSize) {
  return {
    left: Math.round(playerSize.width * pointerPosition.x),
    top: Math.round(playerSize.height - (playerSize.height * pointerPosition.y))
  };
}

/**
 * Handles vjs-contextmenu events.
 *
 * @param  {Event} e
 */
function onVjsContextMenu(e) {

  // We use this property as a toggle for whether or not to display the
  // context menu UI.
  if (!this.contextmenu.options.cancel) {

    // Cancel the next contextmenu event (if any), so the native contextmenu
    // will NOT be displayed and the custom contextmenu will.
    this.contextmenu.options.cancel = true;
    maybeDisposeMenu(this);
    return;
  }

  // Do NOT cancel the next contextmenu event (if any), so the native
  // contextmenu will be displayed and the custom contextmenu will NOT.
  this.contextmenu.options.cancel = false;

  const cmui = this.contextmenuUI;
  const pointerPosition = getPointerPosition(this.el(), e);
  const playerSize = this.el().getBoundingClientRect();
  const menuPosition = findMenuPosition(pointerPosition, playerSize);

  e.preventDefault();

  videojs.log(
    'contextmenu-ui: saw vjs-contextmenu',
    e,
    pointerPosition,
    playerSize,
    menuPosition
  );

  maybeDisposeMenu(this);

  cmui.menu = new Menu(this);
  cmui.menu.addClass(`${CLASS_PREFIX}-menu`);

  cmui.menu.el().style.left = `${menuPosition.left}px`;
  cmui.menu.el().style.top = `${menuPosition.top}px`;

  cmui.content.forEach(c => {
    let fn = function() {};

    if (typeof c.listener === 'function') {
      fn = c.listener;
    } else if (typeof c.href === 'string') {
      fn = () => window.open(c.href);
    }

    cmui.menu.addItem(new ContextMenuItem(this, {
      label: c.label,
      listener: videojs.bind(this, fn)
    }));
  });

  this.addChild(cmui.menu);

  // Override the default "play/pause on click/tap" behavior for the player
  // and close the contextmenu instead on the first interaction outside of
  // the contextmenu. Unfortunately, this means using some private video.js
  // APIs... :(
  cmui.closeMenu = videojs.bind(this, function(ee) {

    // Avoid triggering if the event is targeting an element within the menu.
    if (ee && isDescendantOf(ee.target, cmui.menu.el())) {
      ee.stopPropagation();
      return;
    }

    videojs.log('contextmenu-ui: closeMenu');
    videojs.off(document, ['mousedown', 'touchstart'], cmui.closeMenu);

    // If the player itself has not been disposed...
    if (this.el()) {
      this.off(this.tech_, ['mousedown', 'touchstart'], cmui.closeMenu);
      this.addTechControlsListeners_();
      maybeDisposeMenu(this);
    }
  });

  this.removeTechControlsListeners_();
  this.on(this.tech_, ['mousedown', 'touchstart'], cmui.closeMenu);
  videojs.on(document, ['mousedown', 'touchstart'], cmui.closeMenu);
}

/**
 * Creates a menu for videojs-contextmenu abstract event(s).
 *
 * @function contextmenuUI
 * @param    {Object} options
 * @param    {Array}  options.content
 *           An array of objects which populate a content list within the menu.
 */
function contextmenuUI(options) {
  if (!Array.isArray(options.content)) {
    throw new Error('"content" required');
  }

  // If we have already invoked the plugin, teardown before setting up again.
  if (this.contextmenuUI !== contextmenuUI) {
    maybeDisposeMenu(this);
    this.off('vjs-contextmenu', this.contextmenuUI.onVjsContextMenu);

    // Deleting the player-specific contextmenuUI plugin function/namespace will
    // restore the original plugin function, so it can be called again.
    delete this.contextmenuUI;
  }

  // If we are not already providing "vjs-contextmenu" events, do so.
  this.contextmenu();

  // Wrap the plugin function with an player instance-specific function. This
  // allows us to attach the menu to it without affecting other players on
  // the page.
  const cmui = this.contextmenuUI = function() {
    contextmenuUI.apply(this, arguments);
  };

  cmui.onVjsContextMenu = videojs.bind(this, onVjsContextMenu);
  cmui.content = options.content;
  cmui.VERSION = '__VERSION__';

  this.
    on('vjs-contextmenu', cmui.onVjsContextMenu).
    ready(() => this.addClass(CLASS_PREFIX));
}

videojs.plugin('contextmenuUI', contextmenuUI);
contextmenuUI.VERSION = '__VERSION__';

export default contextmenuUI;
