const Utilities = {
  makeButtonActive: function (selector) {
    document.querySelector('.active').classList.remove('active');
    document.querySelector(selector).classList.add('active');
  },
  capitalize: (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  },
  createNewElement: function(type, className, text, child) {
    let element = document.createElement(type);
    if (className) element.className = className;
    if (child) element.appendChild(child);
    if (text) {
      let textNode = document.createTextNode(text);
      element.appendChild(textNode);
    }
    return element;
  },
  appendElement: function(targetClass, child) {
    let target = document.querySelector(targetClass);
    target.appendChild(child);
  },
  removeAll: function(selector) {    
  document.querySelectorAll(selector).forEach(item => item.remove());
  }
}


export { Utilities };