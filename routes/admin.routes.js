const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const bcryptSalt = 10

const mongoose = require('mongoose')


const User = require("./../models/user.model")
const Product = require("./../models/product.model")
const Store = require('./../models/store.model')


// Create a new product (get)
router.get('/create', (req, res) => res.render('pages/admin/create-product'))



// Create a new product (post)
router.post('/create', (req, res) => {

    const { name, description, type, image, price, stock } = req.body

    Product
        .create({ name, description, type, image, price, stock })
        .then(() => res.redirect('/admin/list'))
        .catch(err => console.log('error', err))
})

// Show the products in stock (get)
router.get('/list', (req, res) => {

    Product
        .find()
        .then(allProducts => res.render('pages/admin/list', { allProducts }))
        .catch(err => console.log('Error!', err))

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
            .then(allStores => res.render('pages/admin/create-store', { allStores }))
            .catch(err => console.log('Error!', err))
    })


    router.post('/create-store', (req, res) => {

        const { name, type, latitude, longitude } = req.body

        const location = {
            type: 'Point',
            coordinates: [latitude, longitude]
        }


        Store
            .create({ name, type, location })
            .then(() => res.redirect('pages/admin/admin-page'))
            .catch(err => console.log(err))
    })

    module.exports = router