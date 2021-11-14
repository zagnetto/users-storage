const controller = require('./storage.cache.controller');

function init(app) {

    app.action('CACHE::GET', endpoint(controller.getCache.bind(controller)))
    app.action('CACHE::PUT', endpoint(controller.putCache.bind(controller)))
}

function endpoint(handler) {
    return async (req, res) => {
        try {
            const result = await handler(req, res);
            res.json(result);
        } catch (error) {
            res.status(400).json({error: error.toString()});
        }
    }
}

module.exports = {init}
