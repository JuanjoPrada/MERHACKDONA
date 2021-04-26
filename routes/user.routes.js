const express = require('express')
const router = express.Router()

const User = require("./../models/user.model")
const Product = require("./../models/product.model")
const Store = require('./../models/store.model')

// router.get('/stores/create', (req, res) => res.render('pages/new-store'))

//  const {name,type,latitude,longitude} = req.body

//   const location = {
//     type: 'Point',
//     coordinates: [latitude, longitude]
//   }


//   Store
//     .create({name,type,location})
//     .then(() => res.redirect('/places/list'))
//     .catch(err => console.log(err))
// })


// Signup form

router.get('/signup-form', (req, res) => res.render('pages/user/signup-form'))
router.post('/signup-form', (req, res, next) => {
    const { name, surname, username, password } = req.body
    User
        .findOne({ username })
        .then(user => {
            if (user) {
                res.render('pages/user/signup-form', { errorMessage: 'This user already exist' })
                return
            }
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)
            User
                .create({ username, name, surname, password: hashPass })
                .then(() => res.redirect('/'))
                .catch(err => {
                    if (err instanceof mongoose.Error.ValidationError) {
                        console.log(err.errors)
                    } else {
                        next()
                    }
                })
        })
        .catch(err => console.log('error', err))
})

module.exports = router