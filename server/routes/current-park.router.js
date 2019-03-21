const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');


router.get('/', (req, res) => {
    console.log('at server - current park', req.query.id);
    pool.query(`SELECT * FROM "all_parks" WHERE "id"= $1;`, [req.query.id])        
            .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('error with current park select', error);
            res.sendStatus(500);
        });
});

router.get('/:id', (req, res) => {
    console.log('at current park get request/server', req.params.id);
    pool.query(`SELECT * FROM "all_parks" WHERE "id"= $1;`, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('error with current park select', error);
            res.sendStatus(500);
        });
});

router.post('/:id', (req, res) => {
   console.log('at current park post route', req.body);
    const newPark = req.body;
    const queryText = `INSERT INTO "parks_visited" ("user_id", "park_id", "date_visited_1", "notes")
                    VALUES ($1, $2, $3, $4)`;
    const queryValues = [
        newPark.user_id,
        newPark.park_id,
        newPark.date_visited_1,
        newPark.notes,
    ];
    pool.query(queryText, queryValues)
        .then(() => { res.sendStatus(201); })
        .catch((err) => {
            console.log('Error completing POST park query', err);
            res.sendStatus(500);
        });
});

module.exports = router;