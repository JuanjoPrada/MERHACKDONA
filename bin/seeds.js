require('dotenv').config()

// DB connection
require('./../config/db.config')

// 1.- require Mongoose
const mongoose = require('mongoose')

// 2. - Model requirement
const Store = require('./../models/store.model')

// 3 .- Data to seed
const stores = [{
        name: "Merhackona de tu Barrio",
        location: {
            type:  "Point",
            coordinates: [40.42737860710969, -3.7092371238445527]
        }
    },
    {
        name: "Merhackona de Pueblo Grande",
        location: {
            type: "Point",
            coordinates: [40.46346808413499, -3.6890429544322716]
        }
    },
   {
       name: "Merhackona de Arriba",
       location: {
           type: "Point",
           coordinates: [40.469563610377556, -3.6985893453888226]
       }
   },
    {
        name: "Merhackona de tu Abajo",
        location: {
            type: "Point",
            coordinates: [40.47250309901578, -3.6869972994022926]
        }
    },
]

// 4.- Seeding time yay!
Store
    .create(stores)
    .then(response => {
        console.log('Estas son las tiendas', response)
        mongoose.connection.close();
    })
    .catch(err => console.log('se produjo un error...', err))