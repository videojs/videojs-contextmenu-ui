<a name="4.0.0"></a>
# 4.0.0 (2017-05-19)

### Chores

* Update tooling using generator v5 prerelease. (#11) ([4b15da5](https://github.com/brightcove/videojs-contextmenu-ui/commit/4b15da5))

### BREAKING CHANGES

* Remove Bower support.

## 3.0.5 (2017-02-08)
* chore: better Travis build, and remove deprecation warnings

## 3.0.4 (2017-01-26)
* refactor: Updates for Video.js 6.0 compatibility.
* refactor: Removed logging statements.

## 3.0.3 (2016-08-02)
* Fix menu display logic (#1)

## 3.0.2 (2016-07-20)
* Override some video.js styles

## 3.0.1 (2016-07-20)
* Fixes an issue where menu item listeners did not fire

## 3.0.0 (2016-07-20)
* Removed the modal in favor of a menu
* Cleaned up UI design
* Context menu now appears only on _alternating_ contextmenu events (if those are what triggered the vjs-contextmenu event)
* Context menu hides when the user begins interacting with the player or the document outside the player

## 2.0.0 (2016-07-13)
* Bind item listeners to the player instance
* Expose the modal and all re-initialization of the plugin

## 1.0.0 (2016-07-12)
* Initial release

