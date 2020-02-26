/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import Utilities from '../utilities.js';

const detailView = {
  init(flightNumber, data) {
    // get clicked item
    const selectedItem = document.querySelector(`.flight-${flightNumber}`);
    // get launchlist element
    let launchList = document.querySelector('.launches-list');
    // get position of clicked item in launch list and add 1.
    let newPosition = Array.prototype.indexOf.call(launchList.children, selectedItem) + 1;

    // rounds the position on a multiple of 4.
    function roundTo4() {
      if (newPosition % 4 !== 0) {
        newPosition += 1;
        roundTo4(newPosition);
      }
    }

    if (window.innerWidth > 580) {
      roundTo4(newPosition);
    }
    // if the multiple of 4 exceeds the amount of childs, set it to the amount of childs minus one.
    if (newPosition > launchList.childElementCount) {
      newPosition = launchList.childElementCount - 1;
    }

    // render the element directly after the clicked element on mobile devices.
    if (window.innerWidth < 580) {
      launchList = document.querySelector('.launches-list');
      const detailview = document.querySelector('.detailview');
      const detailviewPosition = Array.prototype.indexOf.call(launchList.children, detailview);
      const potentialNewPosition = Array.prototype.indexOf.call(launchList.children, selectedItem);
      if (potentialNewPosition > detailviewPosition) {
        newPosition = Array.prototype.indexOf.call(launchList.children, selectedItem);
      } else {
        newPosition = Array.prototype.indexOf.call(launchList.children, selectedItem) + 1;
      }
    }
    const targetElement = document.querySelectorAll('.launches-list-item')[newPosition - 1];
    // create the detailview element.
    const detailviewTitle = Utilities.createNewElement('h2', 'detailview-title', data.mission_name);

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

    this.renderHtml(data, '.detailview');
    // document.querySelector('.detailview').scrollIntoView({ behavior: 'smooth', block: 'center' });
  },
  renderHtml(rawData, targetElement) {
    if (document.querySelector('.property-list')) document.querySelector('.property-list').remove();
    console.log(rawData);
    function addDataToList(data, list, startLevel) {
      for (const property in data) {
        if (data[property] !== null && typeof data[property] !== 'object') {
          const propertySpan = Utilities.createNewElement(
            'span',
            `detail-property-${startLevel}`,
            `${Utilities.capitalize(property.replace(/_/g, ' '))}: `,
          );
          let detailSpan = '';
          if (Utilities.checkForLink(data[property])) {
            detailSpan = Utilities.createNewElement(
              'a',
              'detail-data detail-data-link',
              `${data[property]}`,
            );
            detailSpan.href = data[property];
          } else {
            detailSpan = Utilities.createNewElement(
              'span',
              'detail-data',
              `${data[property]}`,
            );
          }
          const newLi = Utilities.createNewElement(
            'li',
            `detail-level-${startLevel}`,
            '',
            propertySpan,
          );

          newLi.appendChild(detailSpan);
          list.appendChild(newLi);
        } else

        if (data[property] !== null && typeof data[property] === 'object') {
          const newSubUl = Utilities.createNewElement('ul', `property-list-sub-list-${startLevel + 1}`);
          const subListTitle = Utilities.createNewElement('li', 'sub-list-title', `${Utilities.capitalize(property.replace(/_/g, ' '))}: `);
          list.appendChild(subListTitle);
          addDataToList(data[property], newSubUl, startLevel + 1);
          list.appendChild(newSubUl);
        }
      }
    }
    const newUl = Utilities.createNewElement('ul', 'property-list');
    addDataToList(rawData, newUl, 1);

    Utilities.appendElement(targetElement, newUl);

    function removeEmptyUls() {
      const sublistTitles = document.querySelectorAll('.sub-list-title');
      sublistTitles.forEach((title) => {
        const subList = title.nextSibling;
        if (subList.childElementCount < 1) {
          subList.remove();
          title.remove();
        }
      });
    }
    removeEmptyUls();
  },
};

export default detailView;
