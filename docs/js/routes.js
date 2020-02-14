import Render from './render.js';
import Utilities from './utilities.js';

const Routes = {
  '/upcoming': function () {
    Utilities.changeActiveElement('#button-upcoming-launches');
    Utilities.removeAll('.dynamic-content-showcase');
    Utilities.removeAll('.launches-list');

    Render.showcase('next');
    Render.list('upcoming', '.launches-list');
    Render.banner();
  },
  '/past': function () {
    Utilities.changeActiveElement('#button-past-launches');
    Utilities.removeAll('.dynamic-content-showcase');
    Utilities.removeAll('.launches-list');

    Render.showcase('latest');
    Render.list('past', '.launches-list');
    Render.banner();
  },
};

export default Routes;
