import videojs from 'video.js';

const CLASS_PREFIX = 'vjs-contextmenu-ui';

/**
 * Converts items in a content array into DOM elements.
 *
 * @param  {Player} player
 * @param  {Object} item
 * @return {HTMLElement}
 */
const createList = (player, items) => {
  const ul = videojs.createEl('ul', {className: `${CLASS_PREFIX}-list`});

  items.forEach(item => {
    const li = videojs.createEl('li', {className: `${CLASS_PREFIX}-item`});
    const link = videojs.createEl('a', {
      className: `${CLASS_PREFIX}-link`,
      href: item.href || '#',
      target: '_blank'
    });

    videojs.insertContent(link, item.text);

    if (typeof item.listener === 'function') {
      videojs.on(link, 'click', videojs.bind(player, item.listener));
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
  let modal;

  if (!Array.isArray(options.content)) {
    throw new Error('"content" required');
  }

  // If we have already invoked the plugin, dispose of the previous invocation
  // before re-invoking.
  if (this.contextmenuUI !== contextmenuUI) {
    this.contextmenuUI.modal.dispose();
  }

  // If we are not already abstracting "contextmenu" events, do so now.
  this.contextmenu();

  // Wrap the plugin function with an player instance-specific function. This
  // allows us to attach the modal to it without affecting other players on
  // the page.
  this.contextmenuUI = function() {
    contextmenuUI.apply(this, arguments);
  };

  this.contextmenuUI.options = options;

  this.on('vjs-contextmenu', () => {
    if (!modal) {
      modal = this.contextmenuUI.modal = this.createModal(createList(this, options.content), {
        label: options.label || this.localize('Context Menu'),
        temporary: false
      });

      modal.addClass(`${CLASS_PREFIX}-modal`);

      // Clean up our references by removing the instance-specific wrapper if
      // the modal is disposed; re-exposing the plugin itself.
      this.contextmenuUI.modal.on('dispose', () => {
        delete this.contextmenuUI;
      });
    } else {
      modal.open();
    }
  });

  this.ready(() => this.addClass(CLASS_PREFIX));
}

videojs.plugin('contextmenuUI', contextmenuUI);
contextmenuUI.VERSION = '__VERSION__';

export default contextmenuUI;
