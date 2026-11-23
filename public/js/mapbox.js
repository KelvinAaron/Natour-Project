/* eslint-disable */

const locations = JSON.parse(document.getElementById('map').dataset.locations);
const mapboxToken = document.getElementById('map').dataset.token;

// creates the map, passing your access token to associate it with your Mapbox account, and setting the container, initial center, and zoom level
const map = new mapboxgl.Map({
  accessToken: mapboxToken,
  container: 'map', // container ID
  style: 'mapbox://styles/kelvinaaron2003/cmwto5wct00jw01sa058s0ncl',
  scrollZoom: false
  //   center: [-118.113491, 34.111745], // starting position [lng, lat]. Note that lat must be set between -90 and 90
  //   zoom: 6 // starting zoom
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach(loc => {
  // create marker
  const el = document.createElement('div');
  el.className = 'marker';

  // Add the marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom'
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // Add popup
  new mapboxgl.Popup({
    offset: 30
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}`)
    .addTo(map);

  // Extend map bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100
  }
});
