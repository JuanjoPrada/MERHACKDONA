module.exports = {
    isLoggedIn: (req, res, next) => {
        if (req.session.currentUser) {
            next()
        }
        else {
            res.render('pages/user/login-form', { errorMessage: 'Inicia sesión para acceder' })
        }
    },
    checkRoles: (...allowedRoles) => (req, res, next) => {          // REST PARAMETERS
        if (allowedRoles.includes(req.session.currentUser.role)) {
            next()
        } else {
            res.render('pages/user/login-form', { errorMessage: 'Desautorizado' })
        }
    }
}