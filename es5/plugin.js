'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _globalDocument = require('global/document');

var _globalDocument2 = _interopRequireDefault(_globalDocument);

var _videoJs = require('video.js');

var _videoJs2 = _interopRequireDefault(_videoJs);

var _contextMenu = require('./context-menu');

var _contextMenu2 = _interopRequireDefault(_contextMenu);

var _util = require('./util');

// support VJS5 & VJS6 at the same time
var registerPlugin = _videoJs2['default'].registerPlugin || _videoJs2['default'].plugin;

/**
 * Whether or not the player has an active context menu.
 *
 * @param  {Player} player
 * @return {Boolean}
 */
function hasMenu(player) {
  return player.hasOwnProperty('contextmenuUI') && player.contextmenuUI.hasOwnProperty('menu') && player.contextmenuUI.menu.el();
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
    top: Math.round(playerSize.height - playerSize.height * pointerPosition.y)
  };
}

/**
 * Handles vjs-contextmenu events.
 *
 * @param  {Event} e
 */
function onVjsContextMenu(e) {
  var _this = this;

  if (hasMenu(this)) {
    this.contextmenuUI.menu.dispose();
    if (this.contextmenuUI.showNativeOnRecurringEvent) {
      // If this event happens while the custom menu is open, close it and do
      // nothing else. This will cause native contextmenu events to be intercepted
      // once again; so, the next time a contextmenu event is encountered, we'll
      // open the custom menu.
      return;
    }
  }

  if (this.contextmenuUI.showNativeOnRecurringEvent) {
    // Stop canceling the native contextmenu event until further notice.
    this.contextmenu.options.cancel = false;
  }

  // Calculate the positioning of the menu based on the player size and
  // triggering event.
  var pointerPosition = (0, _util.getPointerPosition)(this.el(), e);
  var playerSize = this.el().getBoundingClientRect();
  var menuPosition = findMenuPosition(pointerPosition, playerSize);

  e.preventDefault();

  // Allow dynamically setting the menu labels based on player
  var content = this.contextmenuUI.content;

  if (typeof content === 'function') {
    content = content(this);
  }
  var menu = this.contextmenuUI.menu = new _contextMenu2['default'](this, {
    content: content,
    position: menuPosition
  });

  // This is for backward compatibility. We no longer have the `closeMenu`
  // function, but removing it would necessitate a major version bump.
  this.contextmenuUI.closeMenu = function () {
    _videoJs2['default'].warn('player.contextmenuUI.closeMenu() is deprecated, please use player.contextmenuUI.menu.dispose() instead!');
    menu.dispose();
  };

  // This is to handle a bug where firefox triggers both 'contextmenu' and 'click'
  // events on rightclick, causing menu to open and then immediately close.
  var clickHandler = function clickHandler(_e) {
    if (!(_e.type === 'click' && (_e.which === 3 || _e.button === 2))) {
      menu.dispose();
    }
  };

  menu.on('dispose', function () {
    // Begin canceling contextmenu events again, so subsequent events will
    // cause the custom menu to be displayed again.
    _this.contextmenu.options.cancel = true;
    _videoJs2['default'].off(_globalDocument2['default'], ['click', 'tap'], clickHandler);
    _this.removeChild(menu);
    delete _this.contextmenuUI.menu;
  });

  this.addChild(menu);
  _videoJs2['default'].on(_globalDocument2['default'], ['click', 'tap'], clickHandler);
}

var defaults = {
  showNativeOnRecurringEvent: true
};

/**
 * Creates a menu for videojs-contextmenu abstract event(s).
 *
 * @function contextmenuUI
 * @param    {Object} options
 * @param    {Array}  options.content
 *           An array of objects which populate a content list within the menu.
 */
function contextmenuUI(options) {
  var _this2 = this;

  Object.assign({}, defaults, options);

  if (!Array.isArray(options.content) && typeof options.content !== 'function') {
    throw new Error('"content" required');
  }

  // If we have already invoked the plugin, teardown before setting up again.
  if (hasMenu(this)) {
    this.contextmenuUI.menu.dispose();
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
  var cmui = this.contextmenuUI = function () {
    contextmenuUI.apply(this, arguments);
  };

  cmui.onVjsContextMenu = _videoJs2['default'].bind(this, onVjsContextMenu);
  cmui.content = options.content;
  cmui.showNativeOnRecurringEvent = options.showNativeOnRecurringEvent;
  cmui.VERSION = '__VERSION__';

  this.on('vjs-contextmenu', cmui.onVjsContextMenu);
  this.ready(function () {
    return _this2.addClass('vjs-contextmenu-ui');
  });
}

registerPlugin('contextmenuUI', contextmenuUI);
contextmenuUI.VERSION = '__VERSION__';

exports['default'] = contextmenuUI;
module.exports = exports['default'];