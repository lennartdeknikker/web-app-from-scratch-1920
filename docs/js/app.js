import { showDataFor, renderBannerFor, getDataFor, renderElements } from './utilities.js'

renderBannerFor('latest');

showDataFor('launches/upcoming', '.upcoming-launches');
showDataFor('launches/latest', '.latest-launch', 'p');
showDataFor('launches/past', '.past-launches');

let timer;

async function addToShowcase(type) {

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  let newTitle = `${capitalize(type)} Launch`;
  document.querySelector('.showcase-title').innerHTML = newTitle;

  await getDataFor(`launches/${type}`).then(
    data => {
      const relevantData = {
        imageUrl:  data.links.mission_patch_small,
        missionTitle: data.mission_name,
        flightNumber: data.flight_number,
        rocketTitle: data.rocket.rocket_name,
        launchSite: data.launch_site.site_name,
        launchDate: new Date(data.launch_date_unix * 1000),
        details: data.details,
        videoLink: data.links.video_link
      }
      // remove old data from DOM
      document.querySelectorAll('.next-item').forEach(item => item.remove());

      // add patch image
      let imageElement = document.createElement('img');
      imageElement.src = relevantData.imageUrl;
      imageElement.classList.add('next-item');
      let target = document.querySelector('.showcase-image-container');
      target.appendChild(imageElement);

      // add short info statements
      const shortInfo = [{
        name: 'Mission',
        value: `Nr. ${relevantData.flightNumber}, ${relevantData.missionTitle}`
      },
      {
        name: 'Rocket',
        value: relevantData.rocketTitle
      },
      {
        name: 'Launch Site',
        value: relevantData.launchSite
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

      // add details
      let detailsElement = document.createElement('p');
      let detailsText = document.createTextNode(relevantData.details);
      detailsElement.appendChild(detailsText);
      detailsElement.classList.add('next-item')

      target = document.querySelector('.showcase-details-container');
      target.appendChild(detailsElement);

      // add launch date
      let launchDate = {
        name: 'Launch date',
        value: `${relevantData.launchDate.getDate()}/${String(relevantData.launchDate.getMonth()+1).padStart(2, '0')}/${relevantData.launchDate.getFullYear()} 
        ${relevantData.launchDate.getHours()}:${relevantData.launchDate.getMinutes()}`
      }
      let launchDateElement = document.createElement('p');
      launchDateElement.classList.add('showcase-launchdate-date', 'next-item')

      let launchDateHead = document.createElement('span');
      let launchDateHeadText = document.createTextNode(launchDate.name.toUpperCase());
      launchDateHead.appendChild(launchDateHeadText);
      launchDateHead.classList.add('info-type')

      let launchDateText = document.createTextNode(launchDate.value);

      launchDateElement.appendChild(launchDateHead);
      launchDateElement.appendChild(launchDateText);

      target = document.querySelector('.showcase-launchdate-container');
      target.insertBefore(launchDateElement, target.querySelector('.showcase-launchdate-countdown'));

      // add video link      
      let videoLink = document.createElement('a');
      let videoLinkText = document.createTextNode(' Click here to watch the video')
      let icon = document.createElement('i');
      icon.classList.add('fab', 'fa-youtube')

      videoLink.appendChild(icon)
      videoLink.appendChild(videoLinkText);
      videoLink.classList.add('video-link', 'next-item')
      videoLink.href = relevantData.videoLink

      target = document.querySelector('.showcase-details-container');
      target.appendChild(videoLink);
      
      clearInterval(timer);
      startCountdown(relevantData.launchDate);
    }
  )
}

function startCountdown(compareDate) {

timer = setInterval(function() {
  timeBetweenDates(compareDate);
}, 1000);

function timeBetweenDates(toDate) {
  let dateEntered = toDate;
  let now = new Date();
  let difference = dateEntered.getTime() - now.getTime();

  if (difference <= 0) {
    
    document.querySelector('.launch-days').innerHTML = '';
    document.querySelector('.launch-hours').innerHTML = '';
    document.querySelector('.launch-minutes').innerHTML = '';
    document.querySelector('.launch-seconds').innerHTML = '';
    clearInterval(timer);
  
  } else {
    
    let seconds = Math.floor(difference / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    hours %= 24;
    minutes %= 60;
    seconds %= 60;

    document.querySelector('.launch-days').innerHTML = days + ' days, ';
    document.querySelector('.launch-hours').innerHTML = hours + ' hours, ';
    document.querySelector('.launch-minutes').innerHTML = minutes + ' minutes, ';
    document.querySelector('.launch-seconds').innerHTML = seconds + ' seconds ';
  }
}
}

function makeActive(selector) {
  document.querySelector('.active').classList.remove('active');
  document.querySelector(selector).classList.add('active');
}

document.querySelector('#button-past-launches').addEventListener('click', function() {addToShowcase('latest'); makeActive('#button-past-launches')})
document.querySelector('#button-upcoming-launches').addEventListener('click', function() {addToShowcase('next'); makeActive('#button-upcoming-launches')})

addToShowcase('next')