const path = require('path');
const express = require('express');
const hbs = require('hbs');
const location = require('./utils/location');
const forecast = require('./utils/forecast');

const app = express();

// define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const  viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirPath));

// home page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App'
    });
});

// about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    });
});

// weather page
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide a location.'
        });
    }

    location(req.query.address, (error, { latitude, longitude, placeName } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, { description, temperature, precipitation, humidity, feelsLike } = {}) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                placeName,
                description,
                temperature,
                precipitation,
                feelsLike,
                humidity
            });
        });
    });
});

// 404 page
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Page not found.'
    });
});

app.listen(3333, () => {
    console.log('Server is up on port 3333.');    
});