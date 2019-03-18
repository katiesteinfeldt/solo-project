const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

/**
 * GET route template
 */
let parksData
let parksList = [];
function Park() {
    this.fullName
}

router.get('/', (req, res) => {
    axios({
        method: 'GET',
        url: `https://developer.nps.gov/api/v1/parks?parkCode=&limit=200&q=National%20Park&fields=images`,
        params: {
            api_key: process.env.NPS_API_KEY,
        }
    }).then((response) => {
        res.send(response.data.data);
        parksData = response.data.data;
        cleanData(parksData);
    }).catch(error => {
        console.log('error in parks get request', error);
    });
});

cleanData = () => {
    for (let i = 0; i < parksData.length; i++) {
        let park = parksData[i];
        if (park.designation === 'National Park' || park.designation === 'National Park & Preserve' ||
            park.designation === 'National and State Parks' || park.designation === 'National Parks' || park.fullName === 'National Park of American Samoa') {
            if (park.fullName, park.name, park.description, park.latLong, park.images) {
                parksList.push({
                    park_full_name: park.fullName,
                    park_name: park.name,
                    park_description: park.description,
                    latLong: park.latLong,
                    image_path_1: park.images[0].url
                })
            }
        }
        else {
            console.log(parksList);
        }
    }
}


/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;