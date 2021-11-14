const controller = require('./storage.db.contoroller');

function init(app) {

    app.action('/users/', controller.searchUsers.bind(controller))
    app.action('/users/totals', controller.getTotals.bind(controller))
    app.action('/users/:id', controller.getUserById.bind(controller))
}

module.exports = {init}
