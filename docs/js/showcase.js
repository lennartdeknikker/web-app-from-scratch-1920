import { Utilities } from './utilities.js'

const Showcase = {
changeTitle: function(type) {
  let newTitle = `${Utilities.capitalize(type)} Launch`;
  document.querySelector('.showcase-title').innerHTML = newTitle;
},
removeOldDataFromDom: function() {
  document.querySelectorAll('.next-item').forEach(item => item.remove());
},
addPatchImage: function(imageUrl) {
  let imageElement = document.createElement('img');
  imageElement.src = imageUrl;
  imageElement.classList.add('next-item');
  let target = document.querySelector('.showcase-image-container');
  target.appendChild(imageElement);
},
addShortInfo: function(data) {
  const shortInfo = [{
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
  }]
  for (const item of shortInfo) {
    let newSpan = document.createElement('span');
    newSpan.classList.add('info-type')
    let spanText = document.createTextNode(item.name.toUpperCase())
    newSpan.appendChild(spanText);

    let newNode = document.createElement('li');
    let newContent = document.createTextNode(item.value);
    newNode.appendChild(newSpan);
    newNode.appendChild(newContent);
    newNode.classList.add('next-item');

    let target = document.querySelector('.showcase-titles-container');
    target.appendChild(newNode);
  }
},
addDetails: function(text) {
  let detailsElement = document.createElement('p');
  detailsElement.classList.add('next-item')
  let detailsText = document.createTextNode(text);
  detailsElement.appendChild(detailsText);

  let target = document.querySelector('.showcase-details-container');
  target.appendChild(detailsElement);
},
addVideoLink: function(video) {
  let videoLink = document.createElement('a');
  let videoLinkText = document.createTextNode(' Click here to watch the video')
  let icon = document.createElement('i');
  icon.classList.add('fab', 'fa-youtube')

  videoLink.appendChild(icon)
  videoLink.appendChild(videoLinkText);
  videoLink.classList.add('video-link', 'next-item')
  videoLink.href = video

  let target = document.querySelector('.showcase-details-container');
  target.appendChild(videoLink);
},
addLaunchDate: function(date) {
  let launchDate = {
  name: 'Launch date',
  value: `${date.getDate()}/${String(date.getMonth()+1).padStart(2, '0')}/${date.getFullYear()} 
  ${date.getHours()}:${date.getMinutes()}`
}
let launchDateElement = document.createElement('p');
launchDateElement.classList.add('showcase-launchdate-date', 'next-item')

let launchDateHead = document.createElement('span');
launchDateHead.classList.add('info-type')
let launchDateHeadText = document.createTextNode(launchDate.name.toUpperCase());
launchDateHead.appendChild(launchDateHeadText);

let launchDateText = document.createTextNode(launchDate.value);

launchDateElement.appendChild(launchDateHead);
launchDateElement.appendChild(launchDateText);

let target = document.querySelector('.showcase-launchdate-container');
target.insertBefore(launchDateElement, target.querySelector('.showcase-launchdate-countdown'));

},
init: async function (type, data) {
  this.changeTitle(type)
  this.removeOldDataFromDom()
  this.addPatchImage(data.imageUrl)
  this.addShortInfo(data);
  this.addDetails(data.details);
  this.addVideoLink(data.videoLink);
  this.addLaunchDate(data.launchDate);      
}
};

export { Showcase }