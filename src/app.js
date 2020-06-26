const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// define paths for Express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine, and location of views
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicPath));



// routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'johnahnz0rs'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'johnahnz0rs'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'johnahnz0rs',
        message: 'The ONLY thing we believe is ACTION. Vision plus Action will change your mf\'n life.'
    });
});

// help catch-all
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'johnahnz0rs'
    });
});

app.get('/products', (req, res) => {
    console.log(req.query);
    res.send({
        products: []
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            err: 'You must provide an address'
        });
    }
    geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
        if (err) {
            return res.send({ err: 'Unable to find location. Please try another search.' });
        }
        forecast(latitude, longitude, (err, forecastData) => {
            if (err) {
                return res.send({ err });
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            });
        });
    });
});

// catch-all
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'johnahnz0rs'
    });
});


// START EXPRESS SERVER
app.listen(port, () => {
    console.log('Server is up on port ' + port);
});
