const express = require('express')
const router = express.Router()

const Store = require('./../models/store.model')

// http://localhost:3000/api/stores
router.get('/', (req, res, next) => {
    Store
        .find()
        .then(stores => res.json(stores))
        .catch(err => next(new Error(err)))
})


module.exports = router