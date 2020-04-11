const request = require('request');

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=37fbdc1f3cfe2050c11b21c7c6886f9f&query=${lat},${long}&units=m`;

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);

        } else if (body.error) {
            callback(body.error.info, undefined);

        } else {
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                precipitation: body.current.precip,
                humidity: body.current.humidity,
                feelsLike: body.current.feelslike
            });
        }
    });
};

module.exports = forecast;