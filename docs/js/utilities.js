const Utilities = {
// FUNCTION TO RENDER DOM ELEMENTS FOR GIVEN DATA
renderElements: function (parentElement, childElementType, dataToShow) {
  let newNode = document.createElement(childElementType);
  let newContent = document.createTextNode(dataToShow);
  newNode.appendChild(newContent);
  let target = document.querySelector(parentElement);
  target.appendChild(newNode);
},

makeButtonActive: function (selector) {
  document.querySelector('.active').classList.remove('active');
  document.querySelector(selector).classList.add('active');
}
}


export { Utilities };