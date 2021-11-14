const _ = require('lodash');
const dal = require('./storage.db.dal');

class StorageController {

    async searchUsers(req, res) {
        const searchOptions = _.pick(req.query, 'page', 'limit', 'country', 'city');
        const [data, count] = await Promise.all([
            dal.searchUsers(searchOptions),
            dal.countUsers(searchOptions)
        ]);
        return {count, data};
    }

    async getUserById(req, res) {
        if (!_.get(req, 'params.id')) throw Error(`User id is not specified`);
        const user = await dal.getUserPublicInfoById(req.params.id);
        return user || {};
    }

    async getTotals(req, res) {
        const [country, city, usersCount] = await Promise.all([
            dal.getDistinct('country').then(items => items.length),
            dal.getDistinct('city').then(items => items.length),
            dal.countUsers()
        ])
        return {country, city, usersCount};
    }

}

module.exports = new StorageController();
