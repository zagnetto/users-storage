const controller = require('./storage.cache.controller');

function init(app) {

    app.action('CACHE::GET', controller.getCache.bind(controller))
    app.action('CACHE::PUT', controller.putCache.bind(controller))
}

module.exports = {init}
