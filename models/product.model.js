const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Debes introducir el nombre del producto']
    },
    description: {
        type: String,
        required: [true, 'Debes introducir una descripción del producto']
    },
    type: {
        type: String,
        required: [true, 'Debes introducir el tipo del producto']
        // enum?
    },
    image: {
        type: String,
        default: "https://res.cloudinary.com/dk1u2xsjk/image/upload/v1619361599/default-image_qlyewd.png"
    },
    price: {
        type: Number,
        required: [true, 'Debes introducir el precio del producto'],
        min: 0.01
    },
    stock: {
        type: Number,
        required: [true, 'Debes introducir el stock disponible del producto'],
        min: 0
    }
}, {
    timestamps: true
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product