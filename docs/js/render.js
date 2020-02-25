import Showcase from './components/showcase.js';
import Countdown from './components/countdown.js';
import Data from './data.js';
import List from './components/list.js';
import Detailview from './components/detailview.js';
import Utilities from './utilities.js';
import Loader from './components/loader.js';

const Render = {
// function to obtain the banner image from the latest launch data.
  async banner() {
    await Data.banner().then(
      (data) => {
        document.documentElement.style.setProperty('--banner-background', `url('${data}')`);
      },
    );
  },
  async showcase(type) {
    Loader.initOn('.showcase-image-titles-container');
    await Data.showcase(type).then((data) => {
      Loader.removeFrom('.showcase-image-titles-container');
      Showcase.init(type, data);
      Countdown.init(data.launchDateRaw);
    });
  },
  // FUNCTION TO OBTAIN DATA & ADD THAT TO THE DOM
  async list(identifier) {
    Loader.initOn('.list-view');
    await Data.list(identifier).then(
      (data) => {
        Loader.removeFrom('.list-view');
        List.init(data, identifier);
      },
    );
  },
  async detailView(flightNumber) {
    if (document.querySelector('.detailview')) {
      if (document.querySelector('.property-list')) {
        document.querySelector('.property-list').remove();
      }
      Loader.initOn('.detailview');
    }
    await Data.detailView(flightNumber).then(
      (data) => {
        if (document.querySelector('.detailview') && document.querySelector('.detailview').querySelector('.loader-image')) {
          Loader.removeFrom('.detailview');
        }
        Detailview.init(flightNumber, data);
      },
    );
  },
};

export default Render;
