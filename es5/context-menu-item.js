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

var _videoJs = require('video.js');

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