const Utilities = {
  // sets the active class to passed node.
  changeActiveElement(selector) {
    document.querySelector('.active').classList.remove('active');
    document.querySelector(selector).classList.add('active');
  },
  // capitalizes the first letter of a given string.
  capitalize: (string) => string.charAt(0).toUpperCase() + string.slice(1),
  createNewElement(type, className, text, child) {
    const element = document.createElement(type);

    if (className) element.className = className;
    if (child) element.appendChild(child);
    if (text) {
      const textNode = document.createTextNode(text);
      element.appendChild(textNode);
    }

    return element;
  },
  // appends an element to the DOM.
  appendElement(targetClass, child) {
    if (document.querySelector(targetClass)) {
      const target = document.querySelector(targetClass);
      target.appendChild(child);
    }
  },
  // removes all nodes from the DOM for a given selector.
  removeAll(selector) {
    document.querySelectorAll(selector).forEach((item) => item.remove());
  },
  // parses unixDate to a readable format.
  normalizeDate(unixDate) {
    const date = new Date(unixDate * 1000);
    function addPad(value) {
      return String(value).padStart(2, '0');
    }
    return `${addPad(date.getDate())}/${addPad(date.getMonth() + 1)}/${addPad(date.getFullYear())} 
  ${addPad(date.getHours())}:${addPad(date.getMinutes())}`;
  },
  // checks if the given string contains a link.
  checkForLink(text) {
    return String(text).includes('http');
  },
  // uses Array.reduce to replace letters in a string.
  replace(string, letter, replacement) {
    function replaceLetter(acc, cur) {
      if (cur === letter) { return acc + replacement; }
      return acc + cur;
    }
    return Array.from(string).reduce(replaceLetter);
  },
  // uses Array.map to replace letters in a string.
  replace2(string, letter, replacement) {
    function replaceLetter(cur) {
      return cur === letter ? replacement : cur;
    }
    return String(Array.from(string).map(replaceLetter)).replace(/,/g, '');
  },
};

export default Utilities;
