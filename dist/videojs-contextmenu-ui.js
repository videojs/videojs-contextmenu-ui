/**
 * videojs-contextmenu-ui
 * @version 2.0.0
 * @copyright 2016 Brightcove, Inc.
 * @license Apache-2.0
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.videojsContextmenuUi = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _videoJs2 = _interopRequireDefault(_videoJs);

var CLASS_PREFIX = 'vjs-contextmenu-ui';

/**
 * Converts items in a content array into DOM elements.
 *
 * @param  {Player} player
 * @param  {Object} item
 * @return {HTMLElement}
 */
var createList = function createList(player, items) {
  var ul = _videoJs2['default'].createEl('ul', { className: CLASS_PREFIX + '-list' });

  items.forEach(function (item) {
    var li = _videoJs2['default'].createEl('li', { className: CLASS_PREFIX + '-item' });
    var link = _videoJs2['default'].createEl('a', {
      className: CLASS_PREFIX + '-link',
      href: item.href || '#',
      target: '_blank'
    });

    _videoJs2['default'].insertContent(link, item.text);

    if (typeof item.listener === 'function') {
      _videoJs2['default'].on(link, 'click', _videoJs2['default'].bind(player, item.listener));
    }

    li.appendChild(link);
    ul.appendChild(li);
  });

  return ul;
};

/**
 * Creates a modal for videojs-contextmenu abstract event(s).
 *
 * @function contextmenuUI
 * @param    {Object} options
 * @param    {Array}  options.content
 *           An array of objects which populate a content list within the modal.
 * @param    {String} [options.label="Context Menu"]
 */
function contextmenuUI(options) {
  var _this = this;

  var modal = undefined;

  if (!Array.isArray(options.content)) {
    throw new Error('"content" required');
  }

  // If we have already invoked the plugin, dispose of the previous invocation
  // before re-invoking.
  if (this.contextmenuUI !== contextmenuUI) {
    this.contextmenuUI.modal.dispose();
  }

  // If we are not already abstracting "contextmenu" events, do so now.
  if (typeof this.contextmenu === 'function') {
    this.contextmenu();
  }

  // Wrap the plugin function with an player instance-specific function. This
  // allows us to attach the modal to it without affecting other players on
  // the page.
  this.contextmenuUI = function () {
    contextmenuUI.apply(this, arguments);
  };

  this.contextmenuUI.options = options;

  this.on('vjs-contextmenu', function () {
    if (!modal) {
      modal = _this.contextmenuUI.modal = _this.createModal(createList(_this, options.content), {
        label: options.label || _this.localize('Context Menu'),
        temporary: false
      });

      modal.addClass(CLASS_PREFIX + '-modal');

      // Clean up our references by removing the instance-specific wrapper if
      // the modal is disposed; re-exposing the plugin itself.
      _this.contextmenuUI.modal.on('dispose', function () {
        delete _this.contextmenuUI;
      });
    } else {
      modal.open();
    }
  });

  this.ready(function () {
    return _this.addClass(CLASS_PREFIX);
  });
}

_videoJs2['default'].plugin('contextmenuUI', contextmenuUI);
contextmenuUI.VERSION = '2.0.0';

exports['default'] = contextmenuUI;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});