const request = require("request");

const geocode = (adress, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1Ijoic3RpYnVyZWoiLCJhIjoiY2tpenJ0MXNlMmtzNzJ6bjRrYnVkazY2aSJ9.Wpc-LPQqLfIyOVV8Ar-qRA&limit=1'
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to the location service!');
    } else if (body.features.length === 0) {
      callback('Cannot find matching results')
    }
    else {
      const data = body.features;
      callback(undefined, {
        placeName: data[0].place_name,
        latitude: data[0].center[0],
        longitude: data[0].center[1]
      });
    }
  })
}

module.exports = {
  geocode: geocode
}
