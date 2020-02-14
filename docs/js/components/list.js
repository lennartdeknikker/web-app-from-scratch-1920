/* eslint-disable import/extensions */
import Utilities from '../utilities.js';

const List = {
  init(data, identifier) {
    this.updateTitle(identifier);
    this.generate(data);
  },
  updateTitle(identifier) {
    document.querySelector('.list-title').innerText = `${Utilities.capitalize(identifier)} Launches`;
  },
  generate(data) {
    const newList = Utilities.createNewElement('ol', 'launches-list');
    for (let i = 0; i < data.length; i += 1) {
      const newUl = Utilities.createNewElement('ul', 'launches-list-item-details-list');
      // eslint-disable-next-line no-restricted-syntax
      for (const element in data[i].data) {
        if (data[i].data[element] !== null && data[i].data[element].length > 0) {
          const newDetailLiTitle = Utilities.createNewElement('span', 'details-list-title', `${Utilities.capitalize(element.replace('_', ' '))}: `);
          const newDetailLi = Utilities.createNewElement('li', 'launches-list-item-details-list-item', data[i].data[element], newDetailLiTitle);
          newUl.appendChild(newDetailLi);
        }
      }
      const newLink = Utilities.createNewElement('img', 'test');
      newLink.src = data[i].links.Patch;
      console.log(data[i].links);
      const newLi = Utilities.createNewElement('li', 'launches-list-item');
      newLi.appendChild(newUl);
      newLi.appendChild(newLink);
      newList.appendChild(newLi);
    }
    Utilities.appendElement('.list-view', newList);
  },
};

export default List;
