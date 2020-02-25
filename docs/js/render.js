import Showcase from './components/showcase.js';
import Countdown from './components/countdown.js';
import Data from './data.js';
import List from './components/list.js';
import Detailview from './components/detailview.js';

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
    await Data.showcase(type).then((data) => {
      Showcase.init(type, data);
      Countdown.init(data.launchDateRaw);
    });
  },
  // FUNCTION TO OBTAIN DATA & ADD THAT TO THE DOM
  async list(identifier) {
    await Data.list(identifier).then(
      (data) => {
        List.init(data, identifier);
      },
    );
  },
  async detailView(flightNumber) {
    await Data.detailView(flightNumber).then(
      (data) => {
        Detailview.init(flightNumber, data);
      },
    );
  },
};

export default Render;
