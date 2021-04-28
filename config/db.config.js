const mongoose = require('mongoose')

const Product = require("./../models/product.model")
const Store = require("./../models/store.model")
const User = require("./../models/user.model")
const Cart = require("./../models/cart.model")
const catalog = require("./../catalog")
const stores = require("./../stores")
const users = require("./../users")
const carts = require("./../carts")

const INITIAL_INSERT = false // OJO

const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost/express-boilerplate`

const promise = mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

if (INITIAL_INSERT) {
    promise
        .then(details => {
            const { name, client } = details.connections[0]
            console.log(`Connected to database "${name}" (URL: ${client.s.url})`)
            return details.connection.dropDatabase()
        })
        .then(() => {
            return Product.syncIndexes()
        })
        .then(() => Product.insertMany(catalog))
        .then(() => Store.insertMany(stores))
        .then(() => Cart.insertMany(carts))
        .then(() => User.insertMany(users))
        .catch(err => console.error('Error connecting to Mongo', err))
} else {
    promise
        .then(details => {
            const { name, client } = details.connections[0]
            console.log(`Connected to database "${name}" (URL: ${client.s.url})`)
        })
        .catch(err => console.error('Error connecting to Mongo', err))
}