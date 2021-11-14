const config = require('../config');
const _ = require('lodash');
const dal = require('./storage.cache.dal');

class StorageCacheController {

    async getCache(req, res) {
        const cacheKey = this._buildCacheKey(req);
        res.json(dal.getCache(cacheKey));
    }

    async putCache(req, res) {
        const cacheKey = this._buildCacheKey(req);
        dal.putCache(cacheKey, req.payload);
        dal.planExpireTask(cacheKey, config.cacheTtl);
        res.json({ok: true});
    }

    _buildCacheKey({action, params = {}, query = {}}) {
        const queryStr = _.sortBy(Object.keys(query), key => key).map(key => `${key}=${query[key]}`).join('&');
        const paramsStr = _.sortBy(Object.keys(params), key => key).map(key => `${key}=${params[key]}`).join('&');
        return `${action}::params-${paramsStr}::query-${queryStr}`
    }

}

module.exports = new StorageCacheController();
