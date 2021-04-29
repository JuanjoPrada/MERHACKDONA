const express = require('express')
const router = express.Router()

const { localUpload, CDNupload } = require('./../config/file-upload.config')
const Product = require("./../models/product.model")
const User = require("./../models/user.model")


router.get("/details/:productId", (req, res, next) => {
    
    Product
        .findById(req.params.productId)
        .then(product => {
            res.render("pages/products/product-details", product);
        })
        .catch(err => next(new Error(err)))
})

module.exports = router