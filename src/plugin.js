import document from 'global/document';
import videojs from 'video.js';
import ContextMenu from './context-menu';
import {getPointerPosition} from './util';
import {version as VERSION} from '../package.json';

/**
 * Whether or not the player has an active context menu.
 *
 * @param  {Player} player
 * @return {boolean}
 */
function hasMenu(player) {
  return player.hasOwnProperty('contextmenuUI') &&
    player.contextmenuUI.hasOwnProperty('menu') &&
    player.contextmenuUI.menu.el();
}

/**
 * Defines which elements should be excluded from displaying the context menu
 *
 * @param  {Object} targetEl The DOM element that is being targeted
 * @return {boolean} Whether or not the element should be excluded from displaying the context menu
 */
function excludeElements(targetEl) {
  const tagName = targetEl.tagName.toLowerCase();

  return tagName === 'input' || tagName === 'textarea';
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
 * Handles contextmenu events.
 *
 * @param  {Event} e
 */
function onContextMenu(e) {

  // If this event happens while the custom menu is open, close it and do
  // nothing else. This will cause native contextmenu events to be intercepted
  // once again; so, the next time a contextmenu event is encountered, we'll
  // open the custom menu.
  if (hasMenu(this)) {
    this.contextmenuUI.menu.dispose();
    return;
  }

  if (this.contextmenuUI.options_.excludeElements(e.target)) {
    return;
  }

  // Calculate the positioning of the menu based on the player size and
  // triggering event.
  const pointerPosition = getPointerPosition(this.el(), e);
  const playerSize = this.el().getBoundingClientRect();
  const menuPosition = findMenuPosition(pointerPosition, playerSize);
  // A workaround for Firefox issue  where "oncontextmenu" event
  // leaks "click" event to document https://bugzilla.mozilla.org/show_bug.cgi?id=990614
  const documentEl = videojs.browser.IS_FIREFOX ? document.documentElement : document;

  e.preventDefault();

  const menu = this.contextmenuUI.menu = new ContextMenu(this, {
    content: this.contextmenuUI.content,
    position: menuPosition
  });

  // This is for backward compatibility. We no longer have the `closeMenu`
  // function, but removing it would necessitate a major version bump.
  this.contextmenuUI.closeMenu = () => {
    videojs.log.warn('player.contextmenuUI.closeMenu() is deprecated, please use player.contextmenuUI.menu.dispose() instead!');
    menu.dispose();
  };

  menu.on('dispose', () => {
    videojs.off(documentEl, ['click', 'tap'], menu.dispose);
    this.removeChild(menu);
    delete this.contextmenuUI.menu;
  });

  this.addChild(menu);

  const menuSize = menu.el_.getBoundingClientRect();
  const bodySize = document.body.getBoundingClientRect();

  if (this.contextmenuUI.keepInside ||
      menuSize.right > bodySize.width ||
      menuSize.bottom > bodySize.height) {
    menu.el_.style.left = Math.floor(Math.min(
      menuPosition.left,
      this.player_.currentWidth() - menu.currentWidth()
    )) + 'px';
    menu.el_.style.top = Math.floor(Math.min(
      menuPosition.top,
      this.player_.currentHeight() - menu.currentHeight()
    )) + 'px';
  }

  videojs.on(documentEl, ['click', 'tap'], menu.dispose);
}

/**
 * Creates a menu for contextmenu events.
 *
 * @function contextmenuUI
 * @param    {Object} options
 * @param    {Array}  options.content
 *           An array of objects which populate a content list within the menu.
 * @param    {boolean}  options.keepInside
 *           Whether to always keep the menu inside the player
 * @param    {function}  options.excludeElements
 *           Defines which elements should be excluded from displaying the context menu
 */
function contextmenuUI(options) {
  const defaults = {
    keepInside: true,
    excludeElements
  };

  options = videojs.mergeOptions(defaults, options);

  if (!Array.isArray(options.content)) {
    throw new Error('"content" required');
  }

  // If we have already invoked the plugin, teardown before setting up again.
  if (hasMenu(this)) {
    this.contextmenuUI.menu.dispose();
    this.off('contextmenu', this.contextmenuUI.onContextMenu);

    // Deleting the player-specific contextmenuUI plugin function/namespace will
    // restore the original plugin function, so it can be called again.
    delete this.contextmenuUI;
  }

  // Wrap the plugin function with an player instance-specific function. This
  // allows us to attach the menu to it without affecting other players on
  // the page.
  const cmui = this.contextmenuUI = function() {
    contextmenuUI.apply(this, arguments);
  };

  cmui.onContextMenu = videojs.bind(this, onContextMenu);
  cmui.content = options.content;
  cmui.keepInside = options.keepInside;
  cmui.options_ = options;
  cmui.VERSION = VERSION;

  this.on('contextmenu', cmui.onContextMenu);
  this.ready(() => this.addClass('vjs-contextmenu-ui'));
}

videojs.registerPlugin('contextmenuUI', contextmenuUI);
contextmenuUI.VERSION = VERSION;

export default contextmenuUI;
