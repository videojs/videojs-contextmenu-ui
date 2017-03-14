import document from 'global/document';
import QUnit from 'qunit';
import sinon from 'sinon';
import tsmlj from 'tsmlj';
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

QUnit.test(tsmlj`
  allows dynamically updating menu items values based on current player state
`, function(assert) {
  this.player.contextmenuUI.content = (player) => {
    let isMuted = player.muted();

    return [
      {
        label: isMuted ? 'Unmute' : 'Mute',
        listener: () => {
          player.muted(!isMuted);
        }
      }
    ];
  };

  // Set initial mute state for player
  this.player.muted(false);

  // Show context menu
  this.player.trigger({
    type: 'vjs-contextmenu',
    pageX: 0,
    pageY: 0
  });

  // Assert that player shows option for 'muting'
  let menuItem = this.player.$$('.vjs-contextmenu-ui-menu .vjs-menu-item')[0];

  assert.strictEqual(menuItem.innerText, 'mute');

  // Click menuitem for listener to take effect
  videojs.trigger(menuItem, 'click');
  this.clock.tick(1);

  assert.strictEqual(this.player.$$('.vjs-contextmenu-ui-menu').length, 0);

  // Show context menu again
  this.player.trigger({
    type: 'vjs-contextmenu',
    pageX: 0,
    pageY: 0
  });

  // Make sure the same menu item now shows 'Mute'
  menuItem = this.player.$$('.vjs-contextmenu-ui-menu .vjs-menu-item')[0];
  assert.strictEqual(menuItem.innerText, 'unmute');
});

QUnit.test(tsmlj`
  opens a custom context menu on the first "vjs-contextmenu" event encountered
`, function(assert) {
  this.player.trigger({
    type: 'vjs-contextmenu',
    pageX: 0,
    pageY: 0
  });

  assert.strictEqual(this.player.$$('.vjs-contextmenu-ui-menu').length, 1);
});

QUnit.test(tsmlj`
  closes the custom context menu on the second "vjs-contextmenu" event
  encountered
`, function(assert) {
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

QUnit.test(tsmlj`
  closes the custom context menu when interacting with the player or document
  outside the menu
`, function(assert) {
  this.player.trigger({
    type: 'vjs-contextmenu',
    pageX: 0,
    pageY: 0
  });

  videojs.trigger(document, 'click');

  assert.strictEqual(this.player.$$('.vjs-contextmenu-ui-menu').length, 0);
});
