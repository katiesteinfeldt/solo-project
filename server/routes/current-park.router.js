const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');


router.get('/', (req, res) => {
    console.log('at server - current park', req.params.id);
    pool.query(`SELECT FROM "all_parks" WHERE "id"= $1;`, [req.params.id])        
            .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('error with current park select', error);
            res.sendStatus(500);
        });
});


module.exports = router;