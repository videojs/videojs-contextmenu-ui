import videojs from 'video.js';

const CLASS_PREFIX = 'vjs-contextmenu-ui';

/**
 * Converts items in a content array into DOM elements.
 *
 * @param  {Object} item
 * @return {HTMLElement}
 */
const createList = (items) => {
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
      videojs.on(link, 'click', item.listener);
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
const contextmenuUI = function(options) {
  let modal;

  if (!Array.isArray(options.content)) {
    throw new Error('"content" required');
  }

  // If we are not already abstracting "contextmenu" events, do so now.
  if (typeof this.contextmenu === 'function') {
    this.contextmenu();
  }

  this.on('vjs-contextmenu', () => {
    if (!modal) {
      modal = this.createModal(createList(options.content), {
        label: options.label || this.localize('Context Menu'),
        temporary: false
      });

      modal.addClass(`${CLASS_PREFIX}-modal`);
    } else {
      modal.open();
    }
  });

  this.ready(() => this.addClass(CLASS_PREFIX));
};

videojs.plugin('contextmenuUI', contextmenuUI);
contextmenuUI.VERSION = '__VERSION__';

export default contextmenuUI;
