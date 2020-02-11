import { Utilities } from '../utilities.js'

const Showcase = {
init: async function (type, data) {
  Utilities.removeAll('.dynamic-content-showcase');
  
  this.changeTitle(type)
  this.addPatchImage(data.imageUrl)
  this.addDetails(data.details);
  this.addVideoLink(data.videoLink);
  this.addLaunchDate(data.launchDate);    
  this.addShortInfo([{
    name: 'Mission',
    value: `Nr. ${data.flightNumber}, ${data.missionTitle}`
  },
  {
    name: 'Rocket',
    value: data.rocketTitle
  },
  {
    name: 'Launch Site',
    value: data.launchSite
  }]);  
},
changeTitle: function(type) {
  let newTitle = `${Utilities.capitalize(type)} Launch`;
  document.querySelector('.showcase-title').innerText = newTitle;
},
addPatchImage: function(imageUrl) {
  let newImage = Utilities.createNewElement('img', 'dynamic-content-showcase')
  newImage.src = imageUrl;
  Utilities.appendElement('.showcase-image-container', newImage);
},
addShortInfo: function(info) {
  for (const item of info) {
    let newSpan = Utilities.createNewElement('span', 'info-type', item.name.toUpperCase())
    let newLi = Utilities.createNewElement('li', 'dynamic-content-showcase', item.value, newSpan);
    Utilities.appendElement('.showcase-titles-container', newLi)
  }
},
addDetails: function(text) {
  const newDetails = Utilities.createNewElement('p', 'dynamic-content-showcase', text)
  Utilities.appendElement('.showcase-details-container', newDetails)
},
addVideoLink: function(video) {
  let newIcon = Utilities.createNewElement('i', 'fab fa-youtube');
  let newVideoLink = Utilities.createNewElement('a','video-link dynamic-content-showcase', ' Click here to watch the video', newIcon);
  newVideoLink.href = video;
  Utilities.appendElement('.showcase-details-container', newVideoLink);
},
addLaunchDate: function(date) {
  let launchDate = {
  name: 'Launch date',
  value: this.normalizeLaunchDate(date)
  }
  let newLaunchDateHead = Utilities.createNewElement('span', 'info-type', launchDate.name.toUpperCase());
  let newLaunchDate = Utilities.createNewElement('p', 'showcase-launchdate-date dynamic-content-showcase', launchDate.value, newLaunchDateHead)
  Utilities.appendElement('.showcase-launchdate-date', newLaunchDate);
},
normalizeLaunchDate: function(date) {
  return `${date.getDate()}/${addPad(date.getMonth()+1)}/${addPad(date.getFullYear())} 
  ${date.getHours()}:${addPad(date.getMinutes())}`
  function addPad(value) {
    return String(value).padStart(2, '0');
  }
}
};

export { Showcase }