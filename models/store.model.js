const mongoose = require('mongoose')
const Schema = mongoose.Schema

const storeSchema = new Schema({
    name: String,
    location: {
        type: {
            type: String
        },
        coordinates: [Number]
    }
})

storeSchema.index({ location: '2dsphere' })

const Store = mongoose.model('Store', storeSchema)

module.exports = Store