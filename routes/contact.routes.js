const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')



// Contact page

router.get('/contact-page', (req, res) => res.render('pages/contact/contact-page'))

module.exports = router