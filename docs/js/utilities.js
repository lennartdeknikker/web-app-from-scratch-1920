const Utilities = {
  changeActiveElement(selector) {
    document.querySelector('.active').classList.remove('active');
    document.querySelector(selector).classList.add('active');
  },
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
  appendElement(targetClass, child) {
    if (document.querySelector(targetClass)) {
      const target = document.querySelector(targetClass);
      target.appendChild(child);
    }
  },
  removeAll(selector) {
    document.querySelectorAll(selector).forEach((item) => item.remove());
  },
  normalizeDate(unixDate) {
    const date = new Date(unixDate * 1000);
    function addPad(value) {
      return String(value).padStart(2, '0');
    }
    return `${addPad(date.getDate())}/${addPad(date.getMonth() + 1)}/${addPad(date.getFullYear())} 
  ${addPad(date.getHours())}:${addPad(date.getMinutes())}`;
  },
  checkForLink(text) {
    return String(text).includes('http');
  },
};

export default Utilities;
