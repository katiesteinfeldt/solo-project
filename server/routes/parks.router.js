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
    if (!dataFetched){
        console.log('getting data from API');
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
        postData(parksList);
    }).catch(error => {
        console.log('error in parks get request', error);
    });
    }
    else {
        console.log('getting info from database');
        const queryText = 'SELECT * FROM "all_parks"';
        pool.query(queryText)
            .then((result) => { res.send(result.rows); })
            .catch((err) => {
                console.log('Error completing SELECT all_parks query', err);
                res.sendStatus(500);
            })
    }
});


postData = () => {
    router.post('/', (req, res) => {
        console.log('post data is running');
        const queryText = `INSERT INTO "all_parks" ("park_full_name", "park_name", "park_description", "latLong", "image_path_1")
                    VALUES ($1, $2, $3, $4, $5)`;
        const queryValues = [
            parksList[0].park_full_name,
            parksList[0].park_name,
            parksList[0].park_description,
            parksList[0].latLong,
            parksList[0].image_path_1,
        ];
        pool.query(queryText, queryValues)
            .then(() => res.sendStatus(201))
            .catch((err) => {
                console.log('Error completing POST query', err);
                res.sendStatus(500);
            });
    })
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