const express = require('express')
const router = express.Router()
const bcrypt = require("bcrypt")
const bcryptSalt = 10

const mongoose = require('mongoose')

const {isLoggedIn,checkRoles} = require('./../middlewares')
const {isClient,checkMongooseError} = require('./../utils')


const User = require("./../models/user.model")
const Product = require("./../models/product.model")
const Store = require('./../models/store.model')
const Cart = require('../models/cart.model')


// Signup form
router.get('/signup', (req, res) => res.render('pages/auth/signup-form'))


router.post('/signup', (req, res) => {

    const {name,username, surname,password} = req.body

     if (password.length < 4) {
         res.render('pages/auth/signup-form', {
             errorMessage: 'Debe intruducir una contraseña de 4 caracteres como mínimo'
         })
         return
     }
    
    User
        .findOne({username})
        .then(user => {
            if (user) {
                res.render('pages/auth/signup-form', {
                    errorMessage: 'Este usuario ya existe'
                })
                return
            }
           
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            return  User.create({ username, name, surname, password: hashPass })
        })
        .then(() => res.redirect('/'))
        .catch(err => res.render('pages/auth/signup-form', {
            errorMessage: checkMongooseError(err)
        }))
})


// Login (get)
router.get('/login', (req, res) => res.render('pages/auth/login-form'))


// Login (post)
router.post('/login', (req, res, next) => {

    const {username,password} = req.body

    User
        .findOne({username})
        .then(user => {

            if (!user) {
                res.render('pages/auth/login-form', {
                    errorMessage: 'Usuario no reconocido'
                })
                return
            }

            if (bcrypt.compareSync(password, user.password) === false) {
                res.render('pages/auth/login-form', {
                    errorMessage: 'Contraseña incorrecta'
                })
                return
            }

            req.session.currentUser = user
            res.redirect('/')
        })
        .catch(err => next(new Error(err)))
})


// Logout
router.get('/logout', (req, res) => {
    req.session.destroy((err) => res.redirect("/"));
})


module.exports = router