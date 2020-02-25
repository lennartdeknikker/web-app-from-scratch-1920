import Render from './render.js';
import Utilities from './utilities.js';

const Routes = {
  '/upcoming': function () {
    Utilities.changeActiveElement('#button-upcoming-launches');
    Utilities.removeAll('.dynamic-content-showcase');
    Utilities.removeAll('.launches-list');

    Render.showcase('next');
    Render.list('upcoming');
    Render.banner();
  },
  '/past': function () {
    Utilities.changeActiveElement('#button-past-launches');
    Utilities.removeAll('.dynamic-content-showcase');
    Utilities.removeAll('.launches-list');

    Render.showcase('latest');
    Render.list('past');
    Render.banner();
  },
  '/past/:flightnumber': async function (flightnumber) {
    if (!document.querySelector('.dynamic-content-showcase')) {
      Utilities.changeActiveElement('#button-past-launches');
      Utilities.removeAll('.dynamic-content-showcase');
      Utilities.removeAll('.launches-list');

      Render.showcase('latest');
      await Render.list('past').then(() => Render.detailView(flightnumber));
      Render.banner();
    } else Render.detailView(flightnumber);
  },
  '/upcoming/:flightnumber': async function (flightnumber) {
    if (!document.querySelector('.dynamic-content-showcase')) {
      Utilities.changeActiveElement('#button-upcoming-launches');
      Utilities.removeAll('.dynamic-content-showcase');
      Utilities.removeAll('.launches-list');

      Render.showcase('next');
      await Render.list('upcoming').then(() => Render.detailView(flightnumber));
      Render.banner();
    } else Render.detailView(flightnumber);
  },
};

export default Routes;
