import Api from './api.js';

const Data = {
  async banner() {
    const data = await Api.get('launches/latest');
    return data.links.flickr_images[0];
  },
  async showcase(type) {
    const data = await Api.get(`launches/${type}`);
    return ({
      imageUrl: data.links.mission_patch_small,
      missionTitle: data.mission_name,
      flightNumber: data.flight_number,
      rocketTitle: data.rocket.rocket_name,
      launchSite: data.launch_site.site_name,
      launchDate: new Date(data.launch_date_unix * 1000),
      details: data.details,
      videoLink: data.links.video_link,
    });
  },
  async list(selector) {
    const data = await Api.get(`launches/${selector}`);
    const parsedData = [];
    data.forEach((element) => {
      parsedData.push({
        links: {
          photos: element.links.flickr_images,
          Patch: element.links.mission_patch_small,
          video: element.links.video_link,
        },
        data: {
          missionTitle: element.mission_name,
          flightNumber: element.flight_number,
          rocketTitle: element.rocket.rocket_name,
          launchSite: element.launch_site.site_name,
          launchDate: new Date(element.launch_date_unix * 1000),
          details: element.details,
        },
      });
    });
    return parsedData;
  },
};
export default Data;
