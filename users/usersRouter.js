const express = require('express');
const bcrypt = require('bcryptjs');
const auth = require('../auth/auth-middleware')

const users = require('./usersModel');

const router = express.Router();

router.get('/', auth, (req, res) => {
    users.find()
        .then(users => {  
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({
                error: 'Failed to get users.'
            });
        })
});

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    users.add(user)
        .then(info => {
            res.status(201).json(info);
        })
        .catch(err => {
            res.status(500).json({
                error: "Failed to create user/password."
            })
        })
});

router.post('/login', (req, res) => {
    let {username, password} = req.body;

    users.findBy({username})
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                req.session.user = user;
                res.status(200).json({
                    message: `Welcome ${user.userName}!`
                })
            } else {
                res.status(401).json({
                    error: 'Invalid Credentials'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: 'Unable to login.'
            })
        })
});

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.send('Error logging out.')
            } else {
                res.send('Logged out successfully.')
            }
        })
    } else {
        res.send('Already logged out.')
    }
});

module.exports = router;