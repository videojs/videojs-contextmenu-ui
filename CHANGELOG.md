<a name="5.1.0"></a>
# [5.1.0](https://github.com/brightcove/videojs-contextmenu-ui/compare/v5.0.0...v5.1.0) (2018-10-10)

### Features

* Keep menu within player by default (#5) ([c99d2e8](https://github.com/brightcove/videojs-contextmenu-ui/commit/c99d2e8)), closes [#5](https://github.com/brightcove/videojs-contextmenu-ui/issues/5)

<a name="5.0.0"></a>
# [5.0.0](https://github.com/brightcove/videojs-contextmenu-ui/compare/v4.0.0...v5.0.0) (2018-09-12)

### Bug Fixes

* Remove the postinstall script to prevent install issues (#22) ([812a5f8](https://github.com/brightcove/videojs-contextmenu-ui/commit/812a5f8)), closes [#22](https://github.com/brightcove/videojs-contextmenu-ui/issues/22)

### Chores

* update generator to v7.1.1 ([6e38e5f](https://github.com/brightcove/videojs-contextmenu-ui/commit/6e38e5f))
* Update Rollup to 0.50 (#12) ([08077c4](https://github.com/brightcove/videojs-contextmenu-ui/commit/08077c4)), closes [#12](https://github.com/brightcove/videojs-contextmenu-ui/issues/12)
* **package:** Update dependencies (#19) ([10473f0](https://github.com/brightcove/videojs-contextmenu-ui/commit/10473f0)), closes [#19](https://github.com/brightcove/videojs-contextmenu-ui/issues/19)
* update to generator-videojs-plugin[@7](https://github.com/7).2.0 ([d301a35](https://github.com/brightcove/videojs-contextmenu-ui/commit/d301a35))
* Update to use plugin generator v7.0.2 ([a236811](https://github.com/brightcove/videojs-contextmenu-ui/commit/a236811))
* Update tooling with generator-videojs-plugin v5.2.0 (#13) ([4e915a4](https://github.com/brightcove/videojs-contextmenu-ui/commit/4e915a4)), closes [#13](https://github.com/brightcove/videojs-contextmenu-ui/issues/13)
* **package:** update videojs-generate-rollup-config to version 2.2.0 (#23) ([9e9943f](https://github.com/brightcove/videojs-contextmenu-ui/commit/9e9943f)), closes [#23](https://github.com/brightcove/videojs-contextmenu-ui/issues/23)

### Code Refactoring

* Listen for native contextmenu event instead of emulated vjs-contextmenu. (#18) ([d37c56d](https://github.com/brightcove/videojs-contextmenu-ui/commit/d37c56d)), closes [#18](https://github.com/brightcove/videojs-contextmenu-ui/issues/18)


### BREAKING CHANGES

* This removes the implicit dependency on the now-deprecated videojs-contextmenu plugin and updates minimum Video.js compatibility to v6 or v7.

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

