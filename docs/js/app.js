import { Render } from './render.js';
import { Router } from './router.js'

const App = {
  init: function() {
    Render.banner();
    Render.showcase('next')
    Render.list('upcoming', '.launches-list');
    Router.init();
  }
}

App.init();
