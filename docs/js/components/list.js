import { Utilities } from '../utilities.js';

const List = {
  init: function(data, identifier) {
    Utilities.removeAll('.launches-list');
    document.querySelector('.list-title').innerText = Utilities.capitalize(identifier) + " Launches";
    let newList = Utilities.createNewElement('ol', 'launches-list')
    Utilities.appendElement('.list-view', newList)
    for (let i = 0; i < data.length; i++) {
      let newLi = Utilities.createNewElement('li', null, data[i].mission_name)
      Utilities.appendElement('.launches-list', newLi)
    }
  }
}
// createNewElement: function(type, className, text, child) {
export { List }