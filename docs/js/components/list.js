/* eslint-disable import/extensions */
import Utilities from '../utilities.js';

const List = {
  init(data, identifier) {
    this.updateTitle(identifier);
    Utilities.removeAll('.launches-list');
    this.generate(data);
  },
  updateTitle(identifier) {
    document.querySelector('.list-title').innerText = `${Utilities.capitalize(identifier)} Launches`;
  },
  generate(data) {
    const newList = Utilities.createNewElement('ol', 'launches-list');
    for (let i = 0; i < data.length; i += 1) {
      const newOl = Utilities.createNewElement('ul', 'launches-list-item-details-list');
      // eslint-disable-next-line no-restricted-syntax
      for (const element in data[i].data) {
        if (data[i].data[element] !== null && data[i].data[element].length > 0) {
          const newDetailLi = Utilities.createNewElement('li', 'launches-list-item-details-list-item', `${element} ${data[i].data[element]}`);
          newOl.appendChild(newDetailLi);
        }
      }
      const newLi = Utilities.createNewElement('li', 'launches-list-item');
      newLi.appendChild(newOl);
      newList.appendChild(newLi);
    }
    Utilities.appendElement('.list-view', newList);
  },
};

export default List;
