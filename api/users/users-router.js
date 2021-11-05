const express = require('express');
const router = express.Router();
const User = require('./users-model.js');

router.get('/', (req, res, next) => {
    User.get()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(next);
});

router.get('/:id', (req, res, next) => {
    User.getById(req.params.id)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(next);
});

router.post('/', async(req, res, next) => {
    try {
        const newUser = await User.insert(req.body);
        res.status(201).json(newUser);
    }
    catch(error) {
        next(error)
    }
})

router.delete('/:id', (req, res, next) => {
    User.remove(req.params.id)
        .then(user => {
            if(user > 0) {
                res.status(200).json(user)
            } else {
                next({ status: 404, message: 'This user could not be found.' })
            }
        })
        .catch(next)
})

module.exports = router;