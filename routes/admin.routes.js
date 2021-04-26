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
})

module.exports = router