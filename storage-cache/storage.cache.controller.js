const config = require('../config');
const _ = require('lodash');
const dal = require('./storage.cache.dal');

class StorageCacheController {

    async getCache(req, res) {
        const cacheKey = this._buildCacheKey(req);
        return dal.getCache(cacheKey);
    }

    async putCache(req, res) {
        const cacheKey = this._buildCacheKey(req);
        dal.putCache(cacheKey, req.payload);
        dal.planExpireTask(cacheKey, config.cacheTtl);
        return {ok: true};
    }

    _buildCacheKey({action, params = {}, query = {}}) {
        const queryStr = _.sortBy(Object.keys(query), key => key).map(key => `${key}=${query[key]}`).join('&');
        const paramsStr = _.sortBy(Object.keys(params), key => key).map(key => `${key}=${params[key]}`).join('&');

        // maybe better way is create a hash from this string
        return `${action}::params-${paramsStr}::query-${queryStr}`
    }

}

module.exports = new StorageCacheController();
