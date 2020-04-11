const request = require('request');

const location = (userLocation, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(userLocation)}.json?access_token=pk.eyJ1Ijoibm9kZWpzbGVhcm5lciIsImEiOiJjazhya2szbWEwZmxwM3FvNGdoMGd4bnVmIn0.PfgZoNVdXXOyZOm1i3P5TQ&limit=1`;
    
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);

        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
            
        } else {
            callback(undefined, {
                placeName: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
                
            });
        }
    });
};

module.exports = location;