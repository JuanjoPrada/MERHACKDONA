const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const bcryptSalt = 10

const mongoose = require('mongoose')

const { isLoggedIn, checkRoles } = require('./../middlewares')
const { isClient } = require('./../utils')

const User = require("./../models/user.model")
const Product = require("./../models/product.model")
const Store = require('./../models/store.model')
const Cart = require('../models/cart.model')


// User profile
router.get('/profile', isLoggedIn, checkRoles('CLIENT'), (req, res) => {
    res.render('pages/user/profile-page', { user: req.session.currentUser })
})


// Edit profile
router.get('/edit-profile', isLoggedIn, checkRoles('CLIENT'), (req, res, next) => {
    const { user_id } = req.params
    User
        .findById(user_id)
        .then(theUser => res.render('pages/user/edit-profile-page', { theUser: req.session.currentUser })) //REQ CURRENT SESSION=????
        .catch(err => {
            next();
            return err;
        })
})


router.post('/edit-profile', isLoggedIn, checkRoles('CLIENT'), (req, res, next) => {
    const { _id } = req.session.currentUser
    const { name, surname, username, address, cardNumber } = req.body

    User
        .findByIdAndUpdate(_id, { name, surname, username, address, cardNumber }, { new: true })
        .then((userUpdate) => {
            req.session.currentUser = userUpdate
            res.redirect('/user/profile')
        })
        .catch(err => {
            console.log(err)
            next();
            return err;
        })
})


// Delete Profile
router.post('/delete-profile', isLoggedIn, checkRoles("CLIENT"), (req, res) => {
    const { _id } = req.session.currentUser
    User
        .findByIdAndDelete(_id)
        .then(() => {
            req.session.destroy((err) => res.redirect("/"))
        })
        .catch(err => console.log('Error!', err))
})


module.exports = router