const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

//gets google maps api information

router.get('/', function (req, res) {
    console.log('at google maps get function');
    axios({
        method: 'GET',
        url: `https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&callback=initMap`,
        params: {
            api_key: process.env.GOOGLE_MAPS_API_KEY,
        }
    }).then((response) => {
        res.send(response.data);
    }).catch(error => {
        console.log('error in google maps get request', error);
    });

});


module.exports = router;