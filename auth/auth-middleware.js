const users = require('../users/usersModel');
const bcrypt = require('bcryptjs');

module.exports = (req, res, next) => {
    const {userName, password} = req.headers

    if (userName && password) {
        users.findBy({userName})
            .first()
            .then(user => {
                if (user && bcrypt.compareSync(password, user.password)) {
                    res.status(200)
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
    }
}