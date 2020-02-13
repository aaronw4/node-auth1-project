const express = require('express');

const users = require('./usersModel');

const router = express.Router();

router.get('/', (req, res) => {
    users.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({
                error: 'Failed to get users.'
            })
        })
});

module.exports = router;