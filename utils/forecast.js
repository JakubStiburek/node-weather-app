const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=d1e5477647d69efd531c50e87d64207c&units=metric`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the weather service.");
    } else if (!body.weather) {
      callback("Unable to find location.");
    } else {
      callback(undefined, {
        description: body.weather[0].description,
        temperature: body.main.temp,
        feelslike: body.main.feels_like,
      });
    }
  });
};

module.exports = {
  forecast: forecast,
};
