import { getDataFor } from './utilities.js'

async function showDataFor(identifier, parentElement, childElementType = 'li') {
  await getDataFor(identifier).then(
    data => {
      if (data.length > 1) {
        for (let i = 0; i < data.length; i++) {
          let newNode = document.createElement(childElementType);
          let newContent = document.createTextNode(data[i].mission_name);
          newNode.appendChild(newContent);
          let target = document.querySelector(parentElement);
          target.appendChild(newNode);
        }
      } else {
        let newNode = document.createElement(childElementType);
        let newContent = document.createTextNode(data.mission_name);
        newNode.appendChild(newContent);
        let target = document.querySelector(parentElement);
        target.appendChild(newNode);
      }
    }
  )
}

showDataFor('launches/past', '.past-launches');
showDataFor('launches/upcoming', '.upcoming-launches');
showDataFor('launches/latest', '.latest-launch', 'p');
showDataFor('launches/next', '.next-launch', 'p');

