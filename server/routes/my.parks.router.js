const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => {
    console.log('at server - my parks');
    pool.query(`SELECT "parks_visited"."id" AS "parks_visited_id", "all_parks"."id" AS "all_parks_id", "park_full_name", "date_visited_1", "date_visited_2", "date_visited_3", "notes", "image_path_1", "park_description" FROM "parks_visited" JOIN "all_parks" ON "all_parks"."id"="parks_visited"."park_id";`)
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('error with my parks select', error);
            res.sendStatus(500);
        });
});

router.delete('/:id', (req, res) => {
    console.log(req.params.id);
    pool.query(`DELETE FROM "parks_visited" WHERE "park_id"= $1;`, [req.params.id])
        .then(() => {
            res.sendStatus(204);
        }).catch((error) => {
            console.log('error with park delete query', error);
            res.sendStatus(500);
        });
});

router.put('/:id', (req, res) => {
    console.log('put request', req.body);
    pool.query(`UPDATE "parks_visited" SET "date_visited_1"=$1, "notes"=$2 WHERE "park_id"=$3;`, 
    [req.body.date_visited_1, req.body.notes, req.body.id])
        .then(() => {
            res.sendStatus(204);
        }).catch((error) => {
            console.log('error with park delete query', error);
            res.sendStatus(500);
        });
});

module.exports = router;