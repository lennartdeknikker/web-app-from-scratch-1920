import Router from './router.js';

const App = {
  init() {
    Router.init();
    window.location = '/#/upcoming';
  },
};

App.init();
