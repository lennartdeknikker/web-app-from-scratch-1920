/* eslint-disable no-restricted-syntax */
import Utilities from '../utilities.js';

const detailView = {
  currentPosition: 0,
  init(flightNumber, data) {
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
    const detailviewTitle = Utilities.createNewElement('h2', 'detailview-title', data.mission_name);

    if (newPosition !== detailView.currentPosition) {
      Utilities.removeAll('.detailview');
      const newDiv = Utilities.createNewElement(
        'div',
        'detailview',
      );
      newDiv.appendChild(detailviewTitle);
      targetElement.insertAdjacentElement(
        'afterend',
        newDiv,
      );
    } else {
      document.querySelector('.detailview-title').remove();
      document.querySelector('.detailview').appendChild(detailviewTitle);
    }

    detailView.currentPosition = newPosition;

    this.renderHtml(data, '.detailview');
  },
  renderHtml(rawData, targetElement) {
    if (document.querySelector('.property-list')) document.querySelector('.property-list').remove();
    const newUl = Utilities.createNewElement('ul', 'property-list');
    function addDataToList(data) {
      for (const property in data) {
        if (data[property] !== null && typeof data[property] !== 'object') {
          const propertySpan = Utilities.createNewElement(
            'span',
            'detail-property',
            `${Utilities.capitalize(property.replace(/_/g, ' '))}: `,
          );
          const detailSpan = Utilities.createNewElement(
            'span',
            'detail-data',
            `${data[property]}`,
          );
          const newLi = Utilities.createNewElement(
            'li',
            'detail',
            '',
            propertySpan,
          );

          newLi.appendChild(detailSpan);
          newUl.appendChild(newLi);
        } else

        if (data[property] !== null && typeof data[property] === 'object') {
          addDataToList(data[property]);
        }
      }
    }
    addDataToList(rawData);

    Utilities.appendElement(targetElement, newUl);
  },
};

export default detailView;
