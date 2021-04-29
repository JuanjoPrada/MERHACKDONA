const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const bcryptSalt = 10

const mongoose = require('mongoose')

const { isLoggedIn, checkRoles } = require('./../middlewares')
const { isClient, checkMongooseError } = require('./../utils')

const User = require("./../models/user.model")
const Product = require("./../models/product.model")
const Store = require('./../models/store.model')
const Cart = require('../models/cart.model')


// Show the stores and populate the products for the cart (GET)
router.get('/', isLoggedIn, checkRoles('CLIENT'), (req, res, next) => {
    const storesPromise = Store
        .find()
    const productsPromise = User
        .findById(req.session.currentUser)
        .then(user => {
            return Cart
                .findById(user.cart)
                .populate("products.product")
        })

    Promise
        .all([storesPromise, productsPromise])
        .then(results => {
            res.render('pages/cart/cart-page', {
                allStores: results[0],
                selectedProducts: results[1].products
            })
        })
        .catch(err => next(new Error(err)))
})


// Add a product to cart (POST)
router.post('/add-product/:productId', isLoggedIn, checkRoles('CLIENT'), (req, res, next) => {

    const { amount } = req.body
    const productId = req.params.productId
    const { _id } = req.session.currentUser

    User
        .findById(_id)
        .then(user => {
            Cart
                .findById(user.cart)
                .then(cart => {
                    let product
                    cart.products.forEach(elem => {
                        if (elem.product._id.toString() === productId) {
                            product = elem
                        }
                    })
                    if (product) {
                        product.amount = amount
                    } else {
                        let newProduct = {
                            product: new mongoose.mongo.ObjectId(productId),
                            amount: amount
                        }
                        cart.products.push(newProduct)
                    }
                    cart.save()
                })
            res.json("ok")
        })
})


// Delete a product of the cart (POST)
router.post('/delete/:productId', (req, res, next) => {

    const productId = req.params.productId
    const { _id } = req.session.currentUser

    User
        .findById(_id)
        .then(user => {
            Cart
                .findById(user.cart)
                .then(cart => {
                    let productIndex = -1

                    for (let i = 0; i < cart.products.length; i++) {
                        let product = cart.products[i]

                        if (product.product.toString() === productId) {
                            productIndex = i
                            break
                        }
                    }

                    if (productIndex >= 0) {
                        cart.products.splice(productIndex, 1)
                    }

                    cart.save()
                })
            res.redirect("/cart")
        })
        .catch(err => next(new Error(err)))
})


// Process the purchase
router.post('/purchase', (req, res, next) => {

    const { _id } = req.session.currentUser
    let productAmounts = {}

    User
        .findById(_id)
        .then(user => {
            return Cart
                .findById(user.cart)
        })
        .then(cart => {
            let productIds = []

            cart.products.forEach(product => {
                productIds.push(new mongoose.mongo.ObjectId(product.product._id))
                productAmounts[product.product._id] = product.amount
            })
            // We erase the products from the cart
            cart.products = []
            cart.save()

            return Product
                .find({ "_id": { $in: productIds } })
        })
        .then(products => {
            // We update the stock for each bought product
            products.forEach(product => {
                product.stock -= productAmounts[product._id]
                product.save()
            })
            res.redirect("/cart/purchase/success")
        })
        .catch(err => next(new Error(err)))

})


// Successful purchase
router.get("/purchase/success", (req, res) => {
    res.render("pages/cart/purchase")
})


module.exports = router