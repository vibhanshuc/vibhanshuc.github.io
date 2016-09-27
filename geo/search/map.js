/**
 * Created by vibhanshu on 27/6/16.
 */
(function () {
  'use strict';

  var map = null, marker = null, geocoder = new google.maps.Geocoder();

  function createMap() {
    var map_div = document.getElementById("map-canvas");
    navigator.geolocation.getCurrentPosition(function (position) {
      initMap(map_div, {lat: position.coords.latitude, lng: position.coords.longitude});
    });

    if (!map_div) {
      return false;
    }
  }


  function initMap(map_div, latLng) {

    // the location of the initial pin
    var myLatlng  = new google.maps.LatLng(latLng),
        myOptions = {
          zoom: 16,
          center: myLatlng
        };

    map = new google.maps.Map(map_div, myOptions);

    // establish the initial marker/pin
    marker = createMarker(myLatlng);

    // removing old markers/pins
    google.maps.event.addListener(map, 'click', function (event) {
      // Information for popup window if you so chose to have one
      marker = createMarker(event.latLng, 'name');
      // populate the form fields with lat & lng
      geocodePosition(marker.getPosition());

    });

    getPlace(myLatlng);
  }

  function initVenueForm() {

    var autocomplete,
        options = {
          componentRestrictions: {country: "in"}
        };
    autocomplete = new google.maps.places.Autocomplete((document.getElementById('venue-search-box')), options);

    google.maps.event.addListener(autocomplete, 'place_changed', function () {
      var place = autocomplete.getPlace();
      fillData(place);
    });

  }

  function fillData(place) {
    var i, addressType, val, componentForm;

    componentForm = {
      route: 'long_name',
      administrative_area_level_1: 'long_name',
      administrative_area_level_2: 'short_name',
      sublocality_level_2: 'long_name',
      sublocality_level_3: 'long_name',
      country: 'long_name',
      postal_code: 'short_name'
    };

    for (i in componentForm) {
      console.log(i);
      document.getElementById(i).value = '';
    }

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (i = 0; i < place.address_components.length; i = i + 1) {
      addressType = place.address_components[i].types[0];
      if (componentForm[addressType]) {
        val = place.address_components[i][componentForm[addressType]];
        document.getElementById(addressType).value = val;
      }
    }
    fillInLatLong(place.geometry.location);
    refreshMap(place.geometry.location, place.name);

  }

  function fillInLatLong(obj) {
    //http://stackoverflow.com/questions/13499111/google-maps-geocoder-geocode-geometry-location-lat-lng-property-names-change-f
    var lat = obj.lat().toPrecision(9), lng = obj.lng().toPrecision(9);
    document.getElementById('venue-latitude').value = lat;
    document.getElementById('venue-longitude').value = lng;
  }

  function refreshMap(obj, name) {
    var latlng = obj;
    if ($.isArray(obj)) {
      latlng = new google.maps.LatLng(obj[0], obj[1]);
    }
    marker = createMarker(latlng, name);
    map.panTo(latlng);
  }

  // A function to create the marker
  function createMarker(latlng, name) {
    if (marker) {
      marker.setMap(null);
      marker = null;
    }
    marker = new google.maps.Marker({
      position: latlng,
      map: map,
      zIndex: Math.round(latlng.lat() * -100000) << 5,
      title: name || "",
      draggable: true
    });

    google.maps.event.trigger(marker, 'click');


    google.maps.event.addListener(marker, 'dragstart', function () {
      console.log('Dragging...');

    });

    google.maps.event.addListener(marker, 'dragend', function () {
      // populate the form fields with lat & lng
      geocodePosition(marker.getPosition());
    });
    return marker;

  }

  function geocodePosition(pos) {
    geocoder.geocode({
      latLng: pos
    }, function (responses) {
      if (responses && responses.length > 0) {
        getPlace(pos);
      } else {
        console.log('Cannot determine address at this location.');
      }
    });
  }

  function getPlace(pos) {
    geocoder.geocode({'latLng': pos}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          fillData(results[1]);
        }
      }
    });
  }

  $('#venue-latitude, #venue-longitude').bind('change', function (event) {
    getPlace(new google.maps.LatLng($('#venue-latitude').val(), $('#venue-longitude').val()));
    refreshMap([$('#venue-latitude').val(), $('#venue-longitude').val()]);
  });

  initVenueForm();
  createMap();
}());