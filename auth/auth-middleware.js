const users = require('../users/usersModel');
const bcrypt = require('bcryptjs');

module.exports = function auth(req, res, next) {
    const {username, password} = req.headers;

    if (username && password) {
        users.findBy({username})
            .first()
            .then(user => {
                if (user && bcrypt.compareSync(password, user.password)) {
                    next();
                } else {
                    res.status(401).json({
                        error: 'Invalid Credentials.'
                    })
                }
            })
            .catch(err => {
                res.status(400).json({
                    error: 'Please provide valid credentials.'
                })
            })
    } else {
        res.status(400).json({
            error: 'Please provide valid credentials.'
        })
    }
}