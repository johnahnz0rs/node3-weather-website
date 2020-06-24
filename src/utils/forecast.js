const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1df80f7afd161e5af08c78f1f17297fe&query=' + latitude + ',' + longitude + '&units=f';

    request({url, json: true}, (err, { body }) => {
        if (err) {
            callback('Unable to connect to weather service.', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const forecast = 'It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.';
            callback(undefined, forecast);
        }
    });



}


module.exports = forecast;