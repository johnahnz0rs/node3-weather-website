const request = require('request');



// goal: add new data to forecast
// 1. update the forecast string to include new data
// 2. commit your changes
// 3. push your changes to github and deploy to heroku
// 4. test your work in the live application!



const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1df80f7afd161e5af08c78f1f17297fe&query=' + latitude + ',' + longitude + '&units=f';

    request({url, json: true}, (err, { body }) => {
        if (err) {
            callback('Unable to connect to weather service.', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const forecast = 'It is currently ' + body.current.temperature + ' degrees out. It is ' + body.current.weather_descriptions[0].toLowerCase() + ' and feels like ' + body.current.feelslike + ' degrees.';
            callback(undefined, forecast);
        }
    });



}


module.exports = forecast;