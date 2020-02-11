import { Api } from './api.js'

const Data = {
  banner: async function() {
    return await Api.get(`launches/latest`).then( data =>
      {
        return data.links.flickr_images[0]
      }
    )
  },
  showcase: async function(type) {
    return await Api.get(`launches/${type}`).then(
      data => {
        return {
          imageUrl:  data.links.mission_patch_small,
          missionTitle: data.mission_name,
          flightNumber: data.flight_number,
          rocketTitle: data.rocket.rocket_name,
          launchSite: data.launch_site.site_name,
          launchDate: new Date(data.launch_date_unix * 1000),
          details: data.details,
          videoLink: data.links.video_link
        }
      }
    ) 
  },
  list: async function(selector) {
    return await Api.get(`launches/${selector}`).then( data =>
      {
        return data 
      }
    )
  }
};

export { Data };