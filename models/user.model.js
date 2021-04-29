const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// https://mongoosejs.com/docs/api.html#:~:text=function%20obfuscate%20(cc)%20%7B%0A%20%20return%20%27****-****-****-%27%20%2B%20cc.slice(cc.length-4%2C%20cc.length)%3B%0A%7D
function obfuscate(cc) {
    return '****-****-****-' + cc.slice(cc.length - 4, cc.length);
}

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Debes introducir tu nombre']
    },
    surname: {
        type: String,
        required: [true, 'Debes introducir tu apellido']
    },
    username: {
        type: String,
        unique: true,
        require: [true, 'Debes introducir un nombre de usuario']
    },
    password: {
        type: String,
        required: [true, 'Debes introducir una contraseña']
    },
    address: {
        type: String
    },
    cardNumber: {
        type: String,
        minlength: 16,
        maxlength: 16,
        // required: true,
        get: obfuscate
    },
    role: {
        type: String,
        enum: ["CLIENT", "ADMIN"],
        default: "CLIENT"
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: "Cart"
    },
    conditions: {
        type: Boolean
    }
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User