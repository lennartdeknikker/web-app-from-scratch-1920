import Router from './router.js';

const App = {
  // initializes the router and changes the route to a hash route if it's not there already.
  init() {
    Router.init();
    if (!window.location.href.includes('#')) window.location = '/#/upcoming';
  },
};

App.init();
