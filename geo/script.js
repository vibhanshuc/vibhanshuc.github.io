/**
 * Created by vibhanshu on 26/6/16.
 */
function displayLocation(position) {
  'use strict';

  var latitude = position.coords.latitude, longitude = position.coords.longitude,
      pLocation                                      = document.getElementById('location');

  pLocation.innerHTML += latitude + ', ' + longitude + '<br>';

  var pInfo = document.getElementById('info');
  var date = new Date(position.timestamp);
  pInfo.innerHTML = 'Location Time: ' + date + '<br>';
  pInfo.innerHTML += 'Accuracy of Location: ' + position.coords.accuracy + ' meters<br>';

  if (position.coords.altitude) {
    pInfo.innerHTML += 'Altitue of Location: ' + position.coords.altitude;
  }

  if (position.coords.altitudeAccuracy) {
    pInfo.innerHTML += ' with accuracy: ' + position.coords.altitudeAccuracy + 'in meters<br>';
  }

  pInfo.innerHTML += '<br>';

  if (position.coords.heading) {
    pInfo.innerHTML += 'Heading: ' + position.coords.heading + '<br>';
  }

  if (position.coords.speed) {
    pInfo.innerHTML += 'Speed: ' + position.coords.speed + '<br>';
  }
}

function displayError(error) {
  console.log('Error Occurred: ', error.message);
}

window.onload = function () {
  'use strict';

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(displayLocation, displayError);
  } else {
    alert('browser doesnt support geolocation');
  }
};
