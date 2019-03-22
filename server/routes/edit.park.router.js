const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

router.get('/:id', (req, res) => {
    console.log('at edit park get request/server', req.params.id);
    pool.query(`SELECT "parks_visited"."id" AS "parks_visited_id", "park_full_name", "notes", "date_visited_1" FROM "parks_visited" JOIN "all_parks" ON "all_parks"."id"="parks_visited"."park_id" WHERE "parks_visited"."id"=$1;`, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('error with current park select', error);
            res.sendStatus(500);
        });
});


module.exports = router;