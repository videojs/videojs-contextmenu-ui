import document from 'global/document';
import QUnit from 'qunit';
import sinon from 'sinon';
import videojs from 'video.js';
import plugin from '../src/plugin';

QUnit.test('the environment is sane', function(assert) {
  assert.strictEqual(typeof Array.isArray, 'function', 'es5 exists');
  assert.strictEqual(typeof sinon, 'object', 'sinon exists');
  assert.strictEqual(typeof videojs, 'function', 'videojs exists');
  assert.strictEqual(typeof plugin, 'function', 'plugin is a function');
});

QUnit.module('videojs-contextmenu-ui', {

  beforeEach() {

    // Mock the environment's timers because certain things - particularly
    // player readiness - are asynchronous in video.js 5. This MUST come
    // before any player is created; otherwise, timers could get created
    // with the actual timer methods!
    this.clock = sinon.useFakeTimers();

    this.fixture = document.getElementById('qunit-fixture');
    this.video = document.createElement('video');
    this.fixture.appendChild(this.video);
    this.player = videojs(this.video);

    this.player.contextmenuUI({
      content: [{
        href: 'https://www.brightcove.com/',
        label: 'Brightcove'
      }, {
        label: 'Example Link',
        listener() {
          videojs.log('you clicked the example link!');
        }
      }]
    });

    // Tick the clock forward enough to trigger the player to be "ready".
    this.clock.tick(1);
  },

  afterEach() {

    // Make sure we shut off document-level listeners we may have created!
    // videojs.off(document, ['mousedown', 'touchstart']);
    this.player.dispose();
    this.clock.restore();
  }
});

QUnit.test('opens a custom context menu on the first "vjs-contextmenu" event encountered', function(assert) {
  this.player.trigger({
    type: 'vjs-contextmenu',
    pageX: 0,
    pageY: 0
  });

  assert.strictEqual(this.player.$$('.vjs-contextmenu-ui-menu').length, 1);
});

QUnit.test('closes the custom context menu on the second "vjs-contextmenu" event encountered', function(assert) {
  this.player.trigger({
    type: 'vjs-contextmenu',
    pageX: 0,
    pageY: 0
  });

  this.player.trigger({
    type: 'vjs-contextmenu',
    pageX: 0,
    pageY: 0
  });

  assert.strictEqual(this.player.$$('.vjs-contextmenu-ui-menu').length, 0);
});

QUnit.test('closes the custom context menu when interacting with the player or document outside the menu', function(assert) {
  this.player.trigger({
    type: 'vjs-contextmenu',
    pageX: 0,
    pageY: 0
  });

  videojs.trigger(document, 'click');

  assert.strictEqual(this.player.$$('.vjs-contextmenu-ui-menu').length, 0);
});
