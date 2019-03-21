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


/**
 * POST route template
 */
router.post('/', (req, res) => {
   console.log('at current park post route', req.body);
   res.sendStatus(200);
});

module.exports = router;