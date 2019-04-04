const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

let parksData
let parksList = [];
let dataFetched = false;

//goes to national park service api to retrieve park information
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
    }).catch(error => {
        console.log('error in parks get request', error);
    });
    }
    else {
        console.log('getting info from database');
        const queryText = 'SELECT * FROM "all_parks" ORDER BY "park_full_name"';
        pool.query(queryText)
            .then((result) => { res.send(result.rows); })
            .catch((err) => {
                console.log('Error completing SELECT all_parks query', err);
                res.sendStatus(500);
            })
    }
});

//posts current list of national parks into the all_parks table
postData = () => {
        console.log('post data is running');
        const queryText = `INSERT INTO "all_parks" ("park_full_name", "park_name", "park_description", "latLong", "image_path_1")
                    VALUES ($1, $2, $3, $4, $5) ON CONFLICT ("park_full_name") 
DO
 UPDATE
   SET "park_description" = EXCLUDED.park_description;`;
        const queryValues = [
            parksList[0].park_full_name,
            parksList[0].park_name,
            parksList[0].park_description,
            parksList[0].latLong,
            parksList[0].image_path_1,
        ];
        pool.query(queryText, queryValues)
            .catch((err) => {
                console.log('Error completing POST query', err);
            });
}

//cleans the park information that comes back from the national park service and only selects parks with the designation "national park"
cleanData = () => {
    for (let i = 0; i < parksData.length; i++) {
        let park = parksData[i];
        if (park.designation === 'National Park' || park.designation === 'National Park & Preserve' ||
            park.designation === 'National and State Parks' || park.designation === 'National Parks' || park.fullName === 'National Park of American Samoa') {
            const queryText = `INSERT INTO "all_parks" ("park_full_name", "park_name", "park_description", "latLong", "image_path_1")
                    VALUES ($1, $2, $3, $4, $5) ON CONFLICT ("park_full_name") 
DO
 UPDATE
   SET "park_description" = EXCLUDED.park_description;`;
            const queryValues = [
                park.fullName,
                park.name,
                park.description,
                park.latLong,
                park.images[0].url
            ];
            pool.query(queryText, queryValues)
                .catch((err) => {
                    console.log('Error completing POST query', err);
                });
        }
    }
    console.log(queryValues);
}


module.exports = router;