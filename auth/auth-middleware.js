const users = require('../users/usersModel');
const bcrypt = require('bcryptjs');

module.exports = function auth(req, res, next) {   
    if (req.session && req.session.user) {
       next();
    } else {
        res.status(401).json({
            error: 'Please provide valid credentials.'
        })
    }
}