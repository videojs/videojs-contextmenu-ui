/**
 * videojs-contextmenu-ui
 * @version 3.0.3
 * @copyright 2016 Brightcove, Inc.
 * @license Apache-2.0
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.videojsContextmenuUi = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _globalWindow = require('global/window');

var _globalWindow2 = _interopRequireDefault(_globalWindow);

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var MenuItem = _videoJs2['default'].getComponent('MenuItem');

var ContextMenuItem = (function (_MenuItem) {
  _inherits(ContextMenuItem, _MenuItem);

  function ContextMenuItem() {
    _classCallCheck(this, ContextMenuItem);

    _get(Object.getPrototypeOf(ContextMenuItem.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(ContextMenuItem, [{
    key: 'handleClick',
    value: function handleClick(e) {
      var _this = this;

      _get(Object.getPrototypeOf(ContextMenuItem.prototype), 'handleClick', this).call(this);
      this.options_.listener();

      // Close the containing menu after the call stack clears.
      _globalWindow2['default'].setTimeout(function () {
        _this.player().contextmenuUI.menu.dispose();
      }, 1);
    }
  }]);

  return ContextMenuItem;
})(MenuItem);

exports['default'] = ContextMenuItem;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"global/window":6}],2:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _globalWindow = require('global/window');

var _globalWindow2 = _interopRequireDefault(_globalWindow);

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _contextMenuItem = require('./context-menu-item');

var _contextMenuItem2 = _interopRequireDefault(_contextMenuItem);

var Menu = _videoJs2['default'].getComponent('Menu');

var ContextMenu = (function (_Menu) {
  _inherits(ContextMenu, _Menu);

  function ContextMenu(player, options) {
    var _this = this;

    _classCallCheck(this, ContextMenu);

    _get(Object.getPrototypeOf(ContextMenu.prototype), 'constructor', this).call(this, player, options);

    // Each menu component has its own `dispose` method that can be
    // safely bound and unbound to events while maintaining its context.
    this.dispose = _videoJs2['default'].bind(this, this.dispose);

    options.content.forEach(function (c) {
      var fn = function fn() {};

      if (typeof c.listener === 'function') {
        fn = c.listener;
      } else if (typeof c.href === 'string') {
        fn = function () {
          return _globalWindow2['default'].open(c.href);
        };
      }

      _this.addItem(new _contextMenuItem2['default'](player, {
        label: c.label,
        listener: _videoJs2['default'].bind(player, fn)
      }));
    });
  }

  _createClass(ContextMenu, [{
    key: 'createEl',
    value: function createEl() {
      var el = _get(Object.getPrototypeOf(ContextMenu.prototype), 'createEl', this).call(this);

      _videoJs2['default'].addClass(el, 'vjs-contextmenu-ui-menu');
      el.style.left = this.options_.position.left + 'px';
      el.style.top = this.options_.position.top + 'px';

      return el;
    }
  }]);

  return ContextMenu;
})(Menu);

exports['default'] = ContextMenu;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./context-menu-item":1,"global/window":6}],3:[function(require,module,exports){
// For now, these are copy-pasted from video.js until they are exposed.

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.findElPosition = findElPosition;
exports.getPointerPosition = getPointerPosition;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _globalDocument = require('global/document');

var _globalDocument2 = _interopRequireDefault(_globalDocument);

var _globalWindow = require('global/window');

var _globalWindow2 = _interopRequireDefault(_globalWindow);

/**
 * Offset Left
 * getBoundingClientRect technique from
 * John Resig http://ejohn.org/blog/getboundingclientrect-is-awesome/
 *
 * @function findElPosition
 * @param {Element} el Element from which to get offset
 * @return {Object}
 */

function findElPosition(el) {
  var box = undefined;

  if (el.getBoundingClientRect && el.parentNode) {
    box = el.getBoundingClientRect();
  }

  if (!box) {
    return {
      left: 0,
      top: 0
    };
  }

  var docEl = _globalDocument2['default'].documentElement;
  var body = _globalDocument2['default'].body;

  var clientLeft = docEl.clientLeft || body.clientLeft || 0;
  var scrollLeft = _globalWindow2['default'].pageXOffset || body.scrollLeft;
  var left = box.left + scrollLeft - clientLeft;

  var clientTop = docEl.clientTop || body.clientTop || 0;
  var scrollTop = _globalWindow2['default'].pageYOffset || body.scrollTop;
  var top = box.top + scrollTop - clientTop;

  // Android sometimes returns slightly off decimal values, so need to round
  return {
    left: Math.round(left),
    top: Math.round(top)
  };
}

/**
 * Get pointer position in element
 * Returns an object with x and y coordinates.
 * The base on the coordinates are the bottom left of the element.
 *
 * @function getPointerPosition
 * @param {Element} el Element on which to get the pointer position on
 * @param {Event} event Event object
 * @return {Object}
 *         This object will have x and y coordinates corresponding to the
 *         mouse position
 */

function getPointerPosition(el, event) {
  var position = {};
  var box = findElPosition(el);
  var boxW = el.offsetWidth;
  var boxH = el.offsetHeight;
  var boxY = box.top;
  var boxX = box.left;
  var pageY = event.pageY;
  var pageX = event.pageX;

  if (event.changedTouches) {
    pageX = event.changedTouches[0].pageX;
    pageY = event.changedTouches[0].pageY;
  }

  position.y = Math.max(0, Math.min(1, (boxY - pageY + boxH) / boxH));
  position.x = Math.max(0, Math.min(1, (pageX - boxX) / boxW));

  return position;
}
},{"global/document":5,"global/window":6}],4:[function(require,module,exports){

},{}],5:[function(require,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = require('min-document');

if (typeof document !== 'undefined') {
    module.exports = document;
} else {
    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }

    module.exports = doccy;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"min-document":4}],6:[function(require,module,exports){
(function (global){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined"){
    module.exports = self;
} else {
    module.exports = {};
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _globalDocument = require('global/document');

var _globalDocument2 = _interopRequireDefault(_globalDocument);

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var _contextMenu = require('./context-menu');

var _contextMenu2 = _interopRequireDefault(_contextMenu);

var _util = require('./util');

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

  // If this event happens while the custom menu is open, close it and do
  // nothing else. This will cause native contextmenu events to be intercepted
  // once again; so, the next time a contextmenu event is encountered, we'll
  // open the custom menu.
  if (hasMenu(this)) {
    _videoJs2['default'].log('contextmenu-ui: saw vjs-contextmenu, but menu open');
    this.contextmenuUI.menu.dispose();
    return;
  }

  // Stop canceling the native contextmenu event until further notice.
  this.contextmenu.options.cancel = false;

  // Calculate the positioning of the menu based on the player size and
  // triggering event.
  var pointerPosition = (0, _util.getPointerPosition)(this.el(), e);
  var playerSize = this.el().getBoundingClientRect();
  var menuPosition = findMenuPosition(pointerPosition, playerSize);

  e.preventDefault();

  _videoJs2['default'].log('contextmenu-ui: saw vjs-contextmenu', e, pointerPosition, playerSize, menuPosition);

  var menu = this.contextmenuUI.menu = new _contextMenu2['default'](this, {
    content: this.contextmenuUI.content,
    position: menuPosition
  });

  // This is for backward compatibility. We no longer have the `closeMenu`
  // function, but removing it would necessitate a major version bump.
  this.contextmenuUI.closeMenu = function () {
    _videoJs2['default'].warn('player.contextmenuUI.closeMenu() is deprecated, please use player.contextmenuUI.menu.dispose() instead!');
    menu.dispose();
  };

  menu.on('dispose', function () {

    _videoJs2['default'].log('contextmenu-ui: disposed menu');

    // Begin canceling contextmenu events again, so subsequent events will
    // cause the custom menu to be displayed again.
    _this.contextmenu.options.cancel = true;
    _videoJs2['default'].off(_globalDocument2['default'], ['click', 'tap'], menu.dispose);
    _this.removeChild(menu);
    delete _this.contextmenuUI.menu;
  });

  this.addChild(menu);
  _videoJs2['default'].on(_globalDocument2['default'], ['click', 'tap'], menu.dispose);
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
  var _this2 = this;

  if (!Array.isArray(options.content)) {
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
  cmui.VERSION = '3.0.3';

  this.on('vjs-contextmenu', cmui.onVjsContextMenu).ready(function () {
    return _this2.addClass('vjs-contextmenu-ui');
  });
}

_videoJs2['default'].plugin('contextmenuUI', contextmenuUI);
contextmenuUI.VERSION = '3.0.3';

exports['default'] = contextmenuUI;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./context-menu":2,"./util":3,"global/document":5}]},{},[7])(7)
});