const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const bcryptSalt = 10

const { checkRoles, isLoggedIn } = require('./../middlewares')

const mongoose = require('mongoose')

const User = require("./../models/user.model")
const Product = require("./../models/product.model")
const Store = require('./../models/store.model')


// Create a new product (get)

router.get('/create-product', (req, res) => res.render('pages/admin/create-product'))



// Create a new product (post)

router.post('/create-product', (req, res) => {

    const { name, description, type, image, price, stock } = req.body

    Product
        .create({ name, description, type, image, price, stock })
        .then(() => res.redirect('/admin/products-list'))
        .catch(err => next(new Error(err)))
})


// Show the products in stock (get)

router.get('/products-list', (req, res) => {

    Product
        .find()
        .then(allProducts => res.render('pages/admin/products-list', { allProducts }))
        .catch(err => next(new Error(err)))
})


// Edit a product (get)

router.get("/edit-product/:productId", (req, res) => {
    let productId = req.params.productId
    // console.log(productId)

    Product
        .findById(productId)
        .then(product => res.render("pages/admin/edit-product", product))
        .catch(err => next(new Error(err)))

})



// Edit a product (post)

router.post('/edit-product/:productId', (req, res) => {

    const productId = req.params.productId
    const { name, description, type, image, price, stock } = req.body

    Product
        .findByIdAndUpdate(productId, { name, description, type, image, price, stock })
        .then(() => res.redirect(`/admin/products-list`))
        .catch(err => next(new Error(err)))

})


// Delete a product
router.post("/delete-product/:productId", (req, res) => {

    let productId = req.params.productId

    Product
        .findByIdAndDelete(productId)
        .then(() => res.redirect("/admin/products-list"))
        .catch(err => next(new Error(err)))

})


// Show all the stores

router.get('/stores-list', (req, res) => {

    Store
        .find()
        .then(allStores => res.render('pages/admin/stores-list', { allStores }))
        .catch(err => next(new Error(err)))
})



// Edit a store (get)
router.get("/edit-store/:storeId", (req, res) => {

    let storeId = req.params.storeId

    Store
        .findById(storeId)
        .then(store => res.render("pages/admin/edit-store", store))
        .catch(err => next(new Error(err)))

})



// Edit a store (post)
router.post('/edit-store/:storeId', (req, res) => {

    const storeId = req.params.storeId
    const { name, latitude, longitude } = req.body

    let updateFields = { name }

    updateFields.location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    Store
        .findByIdAndUpdate(storeId, updateFields)
        .then(() => res.redirect(`/admin/stores-list`))
        .catch(err => next(new Error(err)))

})


// Delete a store

router.post("/delete-store/:storeId", (req, res) => {
    let storeId = req.params.storeId

    Store
        .findByIdAndDelete(storeId)
        .then(() => res.redirect("/admin/stores-list"))
        .catch(err => next(new Error(err)))

})


// Admin Panel

router.get('/admin-panel', isLoggedIn, checkRoles('ADMIN'), (req, res) => {
    res.render('pages/admin/admin-page', { user: req.session.currentUser })
})

// Create new Store

router.get('/create-store', (req, res) => {

    Store
        .find()
        .then(allStores => res.render('pages/admin/create-store', { allStores }))
        .catch(err => next(new Error(err)))
})


router.post('/create-store', (req, res) => {

    const { name, latitude, longitude } = req.body

    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }


    Store
        .create({ name, location })
        .then(() => res.redirect('/admin/admin-panel'))
        .catch(err => next(new Error(err)))
})

module.exports = router