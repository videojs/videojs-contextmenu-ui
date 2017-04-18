import window from 'global/window';
import videojs from 'video.js';

const MenuItem = videojs.getComponent('MenuItem');

class ContextMenuItem extends MenuItem {

  handleClick(e) {
    super.handleClick();
    this.options_.listener();

    // Close the containing menu after the call stack clears.
    window.setTimeout(() => {
      this.player().contextmenuUI.menu.dispose();
    }, 1);
  }
}

export default ContextMenuItem;
