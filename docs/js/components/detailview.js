/* eslint-disable no-restricted-syntax */
import Utilities from '../utilities.js';

const detailView = {
  currentPosition: 0,
  init(flightNumber, data) {
    console.log(data);
    const selectedItem = document.querySelector(`.flight-${flightNumber}`);
    const launchList = document.querySelector('.launches-list');
    let newPosition = Array.prototype.indexOf.call(launchList.children, selectedItem) + 1;

    function roundTo4() {
      if (newPosition === 0 || newPosition % 4 !== 0) {
        newPosition += 1;
        roundTo4(newPosition);
      }
    }
    roundTo4(newPosition);
    if (newPosition > launchList.childElementCount) {
      newPosition = launchList.childElementCount - 1;
    }
    const targetElement = document.querySelectorAll('.launches-list-item')[newPosition - 1];

    if (newPosition !== detailView.currentPosition) {
      Utilities.removeAll('.detailview');
      const newDiv = Utilities.createNewElement('div', 'detailview');
      newDiv.innerHTML = data.mission_name;
      targetElement.insertAdjacentElement('afterend', newDiv);
    } else document.querySelector('.detailview').innerHTML = data.mission_name;
    detailView.currentPosition = newPosition;
    this.renderHtml(data);
  },
  renderHtml(data) {
    const newUl = Utilities.createNewElement('ul', 'property-list');
    for (const property in data) {
      if (data[property] !== null && typeof data[property] !== 'object') {
        const newLi = Utilities.createNewElement('li', 'property', `${Utilities.capitalize(property.replace(/_/g, ' '))}: ${data[property]}`);
        newUl.appendChild(newLi);
      } else if (data[property] !== null && typeof data[property] === 'object') {
        data[property].forEach((element) => {
          const newLi = Utilities.createNewElement('li', 'property', `${Utilities.capitalize(property.replace(/_/g, ' '))}: ${data[property]}`);
          newUl.appendChild(newLi);
        });
      }
    }
    Utilities.appendElement('.launches-list', newUl);
  },
};

export default detailView;
