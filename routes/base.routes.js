const express = require('express')
const router = express.Router()

const Store = require("./../models/store.model")
const Product = require("./../models/product.model")

// Endpoints
router.get("/", (req, res, next) => {
    let filter = req.query.filter
    let query = {}

    if (filter) {
        let regex = new RegExp(filter, "gi")
        // Regular expressions
        query["$or"] = [{
            name: regex
        }, {
            description: regex
        }, {
            type: regex
        }];
    }

    Product
        .find(query)
        
        .then(products => {
            res.render("pages/index", { products });
        })
        .catch(err => next(new Error(err)))
})

module.exports = router
