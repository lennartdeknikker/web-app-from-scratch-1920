import Router from './router.js';

const App = {
  init() {
    Router.init();
    if (!window.location.href.includes('#')) window.location = '/#/upcoming';
  },
};

App.init();
