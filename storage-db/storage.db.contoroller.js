const _ = require('lodash');
const dal = require('./storage.db.dal');

class StorageController {

    async searchUsers(req, res) {
        try {
            const searchOptions = _.pick(req.query, 'page', 'limit', 'country', 'city');
            const [data, count] = await Promise.all([
                dal.searchUsers(searchOptions),
                dal.countUsers(searchOptions)
            ]);
            res.json({count, data});
        } catch (error) {
            res.status(400).json({error: error.toString()});
        }
    }

    async getUserById(req, res) {
        try {
            if (!_.get(req, 'params.id')) return res.status(400).json({error: `User id is not specified`});
            const user = await dal.getUserPublicInfoById(req.params.id);
            res.json(user || {});
        } catch (error) {
            res.status(400).json({error: error.toString()});
        }
    }

    //???
    async getTotals(payload, res) {

    }

}

module.exports = new StorageController();
