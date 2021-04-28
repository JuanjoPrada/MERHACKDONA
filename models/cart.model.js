const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product"
        },
        amount: {
            type: Number,
            min: 0
        }
    }]
}, {
    timestamps: true
})

const Cart = mongoose.model("Cart", cartSchema)

module.exports = Cart