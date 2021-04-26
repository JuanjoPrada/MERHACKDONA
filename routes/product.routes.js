const express = require('express')
const router = express.Router()

const { localUpload, CDNupload } = require('./../config/file-upload.config')
const Product = require("./../models/product.model")
const User = require("./../models/user.model")

module.exports = router