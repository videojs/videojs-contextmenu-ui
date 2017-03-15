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

var _contextMenuItem = require('./context-menu-item');

var _contextMenuItem2 = _interopRequireDefault(_contextMenuItem);

var Menu = _videoJs2['default'].getComponent('Menu');
// support VJS5 & VJS6 at the same time
var dom = _videoJs2['default'].dom || _videoJs2['default'];

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

      dom.addClass(el, 'vjs-contextmenu-ui-menu');
      el.style.left = this.options_.position.left + 'px';
      el.style.top = this.options_.position.top + 'px';

      return el;
    }
  }]);

  return ContextMenu;
})(Menu);

exports['default'] = ContextMenu;
module.exports = exports['default'];