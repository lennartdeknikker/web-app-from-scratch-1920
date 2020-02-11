import Render from './render.js';
import Utilities from './utilities.js';

const Routes = {
  '/upcoming': function () {
    Utilities.changeActiveElement('#button-upcoming-launches');
    Render.showcase('next');
    Render.list('upcoming', '.launches-list');
  },
  '/past': function () {
    Utilities.changeActiveElement('#button-past-launches');
    Render.showcase('latest');
    Render.list('past', '.launches-list');
  },
};

export default Routes;
