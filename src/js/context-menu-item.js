import window from 'global/window';
import videojs from 'video.js';

const MenuItem = videojs.getComponent('MenuItem');

/**
 * A menu item for the context menu
 *
 * @extends MenuItem
 */
class ContextMenuItem extends MenuItem {

  /**
   * Any click on a `MenuItem` puts int into the selected state.
   * See {@link ClickableComponent#handleClick} for instances where this is called.
   *
   * @param {EventTarget~Event} event
   *        The `keydown`, `tap`, or `click` event that caused this function to be
   *        called.
   *
   * @listens tap
   * @listens click
   */
  handleClick(event) {
    super.handleClick();
    this.options_.listener();

    // Close the containing menu after the call stack clears.
    window.setTimeout(() => {
      this.player().contextmenuUI.menu.dispose();
    }, 1);
  }
}

export default ContextMenuItem;
