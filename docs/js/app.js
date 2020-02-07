async function getData(data) {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  return fetch(`https://api.spacexdata.com/v3/${data}`, requestOptions)
    .then(response => response.json())
    .then(result => { return result })
    .catch(error => console.log('error', error));
}

async function showData() {
  let test = await getData('launches')
  // getData('launches/latest')
  // getData('history')
  console.log(test);
  document.querySelector('#hallo').innerHTML = test[0].mission_name;
}

showData();