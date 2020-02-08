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
        launchDate: data.launch_date_utc,
        details: data.details
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
      
    }
  )
}

addToShowcase()