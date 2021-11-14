class StorageCacheDal {
    static DEFAULT_CACHE_TTL = 1000 * 60; // 60 sec
    static storage = {};


    getCache(cacheKey) {
        return StorageCacheDal.storage[cacheKey];
    }

    putCache(cacheKey, payload) {
        StorageCacheDal.storage[cacheKey] = payload;
    }

    planExpireTask(cacheKey, ttl = StorageCacheDal.DEFAULT_CACHE_TTL) {
        // I'm not sure that this is best solution
        setTimeout(() => delete StorageCacheDal.storage[cacheKey], ttl);
    }
}

module.exports = new StorageCacheDal();
