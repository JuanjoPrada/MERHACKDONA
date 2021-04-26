module.exports = app => {

    // Base URLS
    app.use('/', require('./base.routes.js'))
    // app.use('/product', require('./product.routes.js'))
    app.use('/user', require('./user.routes.js'))
    app.use('/admin', require('./admin.routes.js'))
    app.use('/api', require('./api.routes.js'))
}