import { showDataFor, renderBanner } from './utilities.js'

renderBanner();

showDataFor('launches/past', '.past-launches');
showDataFor('launches/upcoming', '.upcoming-launches');
showDataFor('launches/latest', '.latest-launch', 'p');
showDataFor('launches/next', '.next-launch', 'p');