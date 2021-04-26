const express = require('express')
const router = express.Router()

const { checkRoles, isLoggedIn } = require('./../middlewares')

const Store = require("./../models/store.model")

// Endpoints

// Admin Panel

router.get('/admin-panel', isLoggedIn, checkRoles('ADMIN'), (req, res) => {
    res.render('pages/admin/admin-page', { user: req.session.currentUser })
})

// Create new Store

router.get('/create-store', (req, res) => {

    Store
        .find()
        .then(allStores => res.render('pages/admin/create-store', {allStores}))
        .catch(err => console.log('Error!', err))
})


router.post('/create-store', (req, res) => {

     const {name,type,latitude,longitude} = req.body

  const location = {
    type: 'Point',
    coordinates: [latitude, longitude]
  }


  Store
    .create({name,type,location})
    .then(() => res.redirect('pages/admin/admin-page'))
    .catch(err => console.log(err))
})

module.exports = router