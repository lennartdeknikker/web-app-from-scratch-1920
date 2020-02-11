import { Utilities } from './utilities.js';
import { Showcase } from './components/showcase.js';
import { Countdown } from './components/countdown.js';
import { Data } from './data.js'
import { List } from './components/list.js';

const Render = {
//function to obtain the banner image from the latest launch data.
banner: async function () {
  await Data.banner().then(
    data => {
      document.documentElement.style.setProperty('--banner-background', `url('${data}')`)
    }
  )
},
showcase: async function(type) {
  await Data.showcase(type).then( data => {
    Showcase.init(type, data);
    Countdown.init(data.launchDate)
  })
},
// FUNCTION TO OBTAIN DATA & ADD THAT TO THE DOM
list: async function (identifier) {
  await Data.list(identifier).then(
    data => {
      List.init(data, identifier);
    }
  )
}
}

export { Render };