const mongoose = require('mongoose')


module.exports = {
    cleanText: text => text.trim(),
    capitalizeText: text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase(),
    isClient: user => user && user.role === 'CLIENT',
    isAdmin: user => user && user.role === 'ADMIN',
    checkMongooseError: err => {
        if (err instanceof mongoose.Error.ValidationError) {
            return Object.values(err.errors).map(elm => elm.message).join('<br>');
        } else if (err.code === 11000) {
            return `Usuario ya registrado`
        }
    }
}