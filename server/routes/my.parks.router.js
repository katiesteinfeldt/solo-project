const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => {
    console.log('at server - my parks');
    pool.query(`SELECT * FROM "parks_visited";`)
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('error with my parks select', error);
            res.sendStatus(500);
        });
});

module.exports = router;