import { Content } from './content.js';
import { Router } from './router.js'

const App = {
  init: function() {Content.loadBannerImage('latest');
    Router.init();
    Content.createList('launches/upcoming', '.upcoming-launches');
    Content.createList('launches/latest', '.latest-launch', 'p');
    Content.createList('launches/past', '.past-launches');
    Content.addToShowcase('next')
  }
}

App.init();
