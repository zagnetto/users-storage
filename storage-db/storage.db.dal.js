const _ = require('lodash');
const mongoClient = require('./mongodb.client');

class StorageDbDal {

    static PUBLIC_VIEW_PROJECTION = {_id: 1, name: 1, email: 1, country: 1, city: 1};
    static DEFAULT_LIMIT = 10;


    async searchUsers(searchOptions = {}) {
        const limit = Number(searchOptions.limit) || StorageDbDal.DEFAULT_LIMIT;
        const page = Number(searchOptions.page) || 1
        const skip = (page - 1) * limit;

        const query = _.omit(searchOptions, 'limit', 'page');
        const options = {limit, skip, projection: StorageDbDal.PUBLIC_VIEW_PROJECTION}
        return mongoClient.find(query, options);
    }

    async countUsers(searchOptions = {}) {
        const query = _.omit(searchOptions, 'limit', 'page');
        return mongoClient.count(query);
    }

    async getUserPublicInfoById(id) {
        return mongoClient.findOne(id, {projection: StorageDbDal.PUBLIC_VIEW_PROJECTION});
    }


    async getTotals() {
        const aggregationQuery = [
            {
                $group: {
                    "_id": {
                        city: "$city",
                        country: "$country"
                    },
                    usersCount: {"$sum": 1}
                }
            }
        ]
        return mongoClient.aggregate(aggregationQuery)
            .then(res => res.toArray())
            .then(res => res.map(({_id: {country, city}, usersCount}) => ({country, city, usersCount})))
            ;
    }

}

module.exports = new StorageDbDal();
