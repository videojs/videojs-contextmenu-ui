# videojs-contextmenu-ui

[![Greenkeeper badge](https://badges.greenkeeper.io/brightcove/videojs-contextmenu-ui.svg)](https://greenkeeper.io/)

A cross-device context menu UI for video.js players.

**Note:** _This plugin depends on the [videojs-contextmenu][contextmenu] plugin, but that plugin is not included with it!_

## Installation

```sh
npm install --save videojs-contextmenu videojs-contextmenu-ui
```

## Usage

The plugin is invoked as a method of a video.js `Player` object:

```js
player.contextmenuUI();
```

Once the plugin is invoked, a modal will appear with a list of links when the `vjs-contextmenu` event is triggered on the `Player` object.

## Options

Options may be passed to the plugin in a plain object:

```js
player.contextmenuUI({
  content: [{

    // A plain old link.
    href: 'https://www.brightcove.com/',
    label: 'Brightcove'
  }, {

    // A link with a listener. Its `href` will automatically be `#`.
    label: 'Example Link',
    listener: function() {
      alert('you clicked the example link!');
    }
  }]
});
```

### `content`

**Required**
**Type**: Array

The plugin requires that `content` be passed as an array. If it is not, an error will be thrown. The array should contain any number of objects which define a series of links that appear in the modal. These objects support the following properties:

- `href`: Defines the value of the `href` attribute of the generated link.
- `listener`: A function which will be bound to the `click` event of the generated link.
- `label`: Text for the link.

## Inclusion

To include videojs-contextmenu-ui on your website or web application, use any of the following methods.

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-contextmenu.min.js"></script>
<script src="//path/to/videojs-contextmenu-ui.min.js"></script>
<script>
  var player = videojs('my-video');

  player.contextmenuUI();
</script>
```

### Browserify

When using with Browserify, install videojs-contextmenu-ui via npm and `require` the plugin as you would any other module.

```js
var videojs = require('video.js');

require('videojs-contextmenu');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-contextmenu-ui');

var player = videojs('my-video');

player.contextmenuUI();
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', 'videojs-contextmenu', 'videojs-contextmenu-ui'], function(videojs) {
  var player = videojs('my-video');

  player.contextmenuUI();
});
```

## License

Apache-2.0. Copyright (c) Brightcove, Inc.


[contextmenu]: https://github.com/brightcove/videojs-contextmenu
[videojs]: http://videojs.com/
