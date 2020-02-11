import Utilities from '../utilities.js';

const Showcase = {
  async init(type, data) {
    Utilities.removeAll('.dynamic-content-showcase');

    this.changeTitle(type);
    this.addPatchImage(data.imageUrl);
    this.addDetails(data.details);
    this.addVideoLink(data.videoLink);
    this.addLaunchDate(data.launchDate);
    this.addShortInfo([{
      name: 'Mission',
      value: `Nr. ${data.flightNumber}, ${data.missionTitle}`,
    },
    {
      name: 'Rocket',
      value: data.rocketTitle,
    },
    {
      name: 'Launch Site',
      value: data.launchSite,
    }]);
  },
  changeTitle(type) {
    const newTitle = `${Utilities.capitalize(type)} Launch`;
    document.querySelector('.showcase-title').innerText = newTitle;
  },
  addPatchImage(imageUrl) {
    const newImage = Utilities.createNewElement('img', 'dynamic-content-showcase');
    newImage.src = imageUrl;
    Utilities.appendElement('.showcase-image-container', newImage);
  },
  addShortInfo(info) {
    for (const item of info) {
      const newSpan = Utilities.createNewElement('span', 'info-type', item.name.toUpperCase());
      const newLi = Utilities.createNewElement('li', 'dynamic-content-showcase', item.value, newSpan);
      Utilities.appendElement('.showcase-titles-container', newLi);
    }
  },
  addDetails(text) {
    const newDetails = Utilities.createNewElement('p', 'dynamic-content-showcase', text);
    Utilities.appendElement('.showcase-details-container', newDetails);
  },
  addVideoLink(video) {
    const newIcon = Utilities.createNewElement('i', 'fab fa-youtube');
    const newVideoLink = Utilities.createNewElement('a', 'video-link dynamic-content-showcase', ' Click here to watch the video', newIcon);
    newVideoLink.href = video;
    Utilities.appendElement('.showcase-details-container', newVideoLink);
  },
  addLaunchDate(date) {
    const launchDate = {
      name: 'Launch date',
      value: this.normalizeLaunchDate(date),
    };
    const newLaunchDateHead = Utilities.createNewElement('span', 'info-type', launchDate.name.toUpperCase());
    const newLaunchDate = Utilities.createNewElement('p', 'showcase-launchdate-date dynamic-content-showcase', launchDate.value, newLaunchDateHead);
    Utilities.appendElement('.showcase-launchdate-date', newLaunchDate);
  },
  normalizeLaunchDate(date) {
    return `${date.getDate()}/${addPad(date.getMonth() + 1)}/${addPad(date.getFullYear())} 
  ${date.getHours()}:${addPad(date.getMinutes())}`;
    function addPad(value) {
      return String(value).padStart(2, '0');
    }
  },
};

export default Showcase;
