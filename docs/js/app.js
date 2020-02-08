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

async function showData() {
  await getDataFor('launches').then(
    data => {
      document.querySelector('#hallo').innerHTML = data[0].mission_name;
    }
  )
}

showData();