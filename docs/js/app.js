import { showDataFor, renderBanner, getDataFor, renderElements } from './utilities.js'

renderBanner();

showDataFor('launches/upcoming', '.upcoming-launches');
showDataFor('launches/latest', '.latest-launch', 'p');
showDataFor('launches/past', '.past-launches');

async function addToShowcase() {
  await getDataFor('launches/next').then(
    data => {
      const relevantData = {
        imageUrl:  data.links.mission_patch_small,
        missionTitle: data.mission_name,
        flightNumber: data.flight_number,
        rocketTitle: data.rocket.rocket_name,
        launchSite: data.launch_site.site_name,
        launchSiteLong: data.launch_site.site_name_long,
        launchDate: new Date(data.launch_date_unix * 1000),
        details: data.details,
        videoLink: data.links.video_link
      }

      // add patch image
      let imageElement = document.createElement('img');
      imageElement.src = relevantData.imageUrl;
      let target = document.querySelector('.showcase-image-container');
      target.appendChild(imageElement);

      // add short info statements
      const shortInfo = [{
        name: `Mission Nr. ${relevantData.flightNumber}: `,
        value: relevantData.missionTitle
      },
      {
        name: 'Rocket: ',
        value: relevantData.rocketTitle
      },
      {
        name: 'Launch Site: ',
        value: `${relevantData.launchSiteLong}(${relevantData.launchSite})`
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

        let target = document.querySelector('.showcase-titles-container');
        target.appendChild(newNode);
      }

      // add details
      let detailsElement = document.createElement('p');
      let detailsText = document.createTextNode(relevantData.details);
      detailsElement.appendChild(detailsText);
      target = document.querySelector('.showcase-details-container');
      target.appendChild(detailsElement);

      // add launch date
      let launchDate = {
        name: 'Launch date: ',
        value: `${relevantData.launchDate.getDate()}/${String(relevantData.launchDate.getMonth()+1).padStart(2, '0')}/${relevantData.launchDate.getFullYear()} 
        ${relevantData.launchDate.getHours()}:${relevantData.launchDate.getMinutes()}`
      }
      let launchDateElement = document.createElement('p');

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
      videoLink.classList.add('video-link')
      videoLink.href = relevantData.videoLink

      target = document.querySelector('.showcase-details-container');
      target.appendChild(videoLink);
      
      startCountdown(relevantData.launchDate);
    }
  )
}

function startCountdown(compareDate) {
let timer = setInterval(function() {
  timeBetweenDates(compareDate);
}, 1000);

function timeBetweenDates(toDate) {
  let dateEntered = toDate;
  let now = new Date();
  let difference = dateEntered.getTime() - now.getTime();

  if (difference <= 0) {

    clearInterval(timer);
  
  } else {
    
    let seconds = Math.floor(difference / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    hours %= 24;
    minutes %= 60;
    seconds %= 60;

    document.querySelector('.launch-days').innerHTML = days + ' days, '
    document.querySelector('.launch-hours').innerHTML = hours + ' hours, '
    document.querySelector('.launch-minutes').innerHTML = minutes + ' minutes and '
    document.querySelector('.launch-seconds').innerHTML = seconds + ' seconds '
  }
}
}

addToShowcase()