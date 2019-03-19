const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

/**
 * GET route template
 */
let parksData
let parksList = [];
let dataFetched = false;

router.get('/', (req, res) => {
    axios({
        method: 'GET',
        url: `https://developer.nps.gov/api/v1/parks?parkCode=&limit=200&q=National%20Park&fields=images`,
        params: {
            api_key: process.env.NPS_API_KEY,
        }
    }).then((response) => {
        parksData = response.data.data;
        dataFetched = true;
        cleanData(parksData);
        res.sendStatus(200);
        if (dataFetched) {postData(parksList);
        }
    }).catch(error => {
        console.log('error in parks get request', error);
    });
});

postData = () => {
    console.log('post data is running');
}


cleanData = () => {
    for (let i = 0; i < parksData.length; i++) {
        let park = parksData[i];
        if (park.designation === 'National Park' || park.designation === 'National Park & Preserve' ||
            park.designation === 'National and State Parks' || park.designation === 'National Parks' || park.fullName === 'National Park of American Samoa') {
            parksList.push({
                park_full_name: park.fullName,
                park_name: park.name,
                park_description: park.description,
                latLong: park.latLong,
                image_path_1: park.images[0].url
            })
        }
    }
    console.log(parksList);
}


/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;