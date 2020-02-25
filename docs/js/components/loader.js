import Utilities from '../utilities.js';

const Loader = {
  initOn(target) {
    const targetElement = document.querySelector(target);
    const loaderImage = Utilities.createNewElement('img', 'loader-image');
    loaderImage.src = './img/loader.png';
    targetElement.appendChild(loaderImage);
  },
  removeFrom(target) {
    document.querySelector(target).querySelector('.loader-image').remove();
  },
};

export default Loader;
