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
    // if there's already content in the showcase element.
    if (!document.querySelector('.dynamic-content-showcase')) {
      // update the active button.
      Utilities.changeActiveElement('#button-past-launches');
      // remove the old content from the showcase element.
      Utilities.removeAll('.dynamic-content-showcase');
      Utilities.removeAll('.launches-list');
      // render the new data for the showcase element.
      Render.showcase('latest');
      // render the new list data.
      await Render.list('past').then(() => {
        Render.detailView(flightnumber);
        if (document.querySelector('.selected')) document.querySelector('.selected').classList.remove('selected');
        document.querySelector(`.flight-${flightnumber}`).classList.add('selected');
      });
      // render the banner.
      Render.banner();
    }
    // Render the detailview for the linked flight number.
    Render.detailView(flightnumber);

    if (document.querySelector('.selected')) document.querySelector('.selected').classList.remove('selected');
    // add selected class to the selected element.
    document.querySelector(`.flight-${flightnumber}`).classList.add('selected');
  },
  '/upcoming/:flightnumber': async function (flightnumber) {
    if (!document.querySelector('.dynamic-content-showcase')) {
      Utilities.changeActiveElement('#button-upcoming-launches');
      Utilities.removeAll('.dynamic-content-showcase');
      Utilities.removeAll('.launches-list');

      Render.showcase('next');

      await Render.list('upcoming').then(() => {
        Render.detailView(flightnumber);
        if (document.querySelector('.selected')) document.querySelector('.selected').classList.remove('selected');
        document.querySelector(`.flight-${flightnumber}`).classList.add('selected');
      });

      Render.banner();
    }

    Render.detailView(flightnumber);
    if (document.querySelector('.selected')) document.querySelector('.selected').classList.remove('selected');
    document.querySelector(`.flight-${flightnumber}`).classList.add('selected');
  },
};

export default Routes;
