// FUNCTION TO OBTAIN DATA FROM THE SPACEX API
async function getDataFor(data) {
  // endpoint and request header configuration
  const endpoint = 'https://api.spacexdata.com/v3/';
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  // fetch request returning obtained data.
  return fetch(`${endpoint + data}`, requestOptions)
    .then(handleResponse)
    .then(data => {console.log(data); return data;})
    .catch(error => console.log(error))

// Error handling as learned from https://css-tricks.com/using-fetch/

  function handleResponse(response) {
    let contentType = response.headers.get('content-type')
    if (contentType.includes('application/json')) {
      return handleJSONResponse(response)
    } else if (contentType.includes('text/html')) {
      return handleTextResponse(response)
    } else {
      throw new Error(`Sorry, content-type ${contentType} is not supported.`)
    }
  }

  function handleJSONResponse (response) {
    return response.json()
    .then(json => {
      if (response.ok) {
        return json
      } else {
        return Promise.reject(Object.assign({}, json, {
          status: response.status,
          statusText: response.statusText
        }))
      }
    })
  }

  function handleTextResponse (response) {
    return response.text()
    .then(text => {
      if (response.ok) {
        return text
      } else {
        return Promise.reject({
          status: response.status,
          statusText: response.statusText,
          err: text
        })
      }
    })
  }
}

// FUNCTION TO OBTAIN DATA & ADD THAT TO THE DOM
async function showDataFor(identifier, parentElement, childElementType = 'li') {
  await getDataFor(identifier).then(
    data => {
      if (data.length > 1) {
        for (let i = 0; i < data.length; i++) {
          renderElements(parentElement, childElementType, data[i].mission_name)
        }
      } else {
        renderElements(parentElement, childElementType, data.mission_name);
      }
    }
  )
}

// FUNCTION TO RENDER DOM ELEMENTS FOR GIVEN DATA
function renderElements(parentElement, childElementType, dataToShow) {
  let newNode = document.createElement(childElementType);
  let newContent = document.createTextNode(dataToShow);
  newNode.appendChild(newContent);
  let target = document.querySelector(parentElement);
  target.appendChild(newNode);
}

async function renderBanner() {
  await getDataFor('launches/latest').then(
    data => {
      document.querySelector('.banner-background').style = `background:center bottom / cover no-repeat url('${data.links.flickr_images[0]}');`;
      document.querySelector('blockquote').style = 'color: white; text-shadow: 1px 1px 10px black;';
      console.log(data.links.flickr_images[0]);
    }
  )
}

export { getDataFor, showDataFor, renderElements, renderBanner };