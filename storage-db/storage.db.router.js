const controller = require('./storage.db.contoroller');

function init(app) {

    app.action('/users/', endpoint(controller.searchUsers.bind(controller)))
    app.action('/users/totals', endpoint(controller.getTotals.bind(controller)))
    app.action('/users/:id', endpoint(controller.getUserById.bind(controller)))

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
