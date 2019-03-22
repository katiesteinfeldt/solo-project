const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

router.get('/:id', (req, res) => {
    console.log('at edit park get request/server', req.params.id);
    pool.query(`SELECT * FROM "parks_visited" WHERE "id"= $1;`, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('error with current park select', error);
            res.sendStatus(500);
        });
});


module.exports = router;