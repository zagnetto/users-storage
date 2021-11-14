module.exports = {

    rabbitMQ: {
        url: process.env.APP_RABBIT_MQ_URL || `amqp://127.0.0.1:5672`,
    },
    mongoDB: {
        url: process.env.APP_MONGODB_URL || `mongodb://127.0.0.1:27017`,
        db: process.env.APP_DB_NAME || 'users-storage'
    },

    testDataSize: 1000000,
    cacheTtl: 1000 * 60,

    services: {
        api: {
            name: 'api',
            host: process.env.SVC_API_HOST || '127.0.0.1',
            port: process.env.SVC_API_PORT || '7000',
        },
        storageCache: {
            name: 'storage-cache',
            host: process.env.SVC_STORAGE_CACHE_HOST || '127.0.0.1',
            port: process.env.SVC_STORAGE_CACHE_PORT || '7001',
        },
        storageDb: {
            name: 'storage-db',
            host: process.env.SVC_STORAGE_DB_HOST || '127.0.0.1',
            port: process.env.SVC_STORAGE_DB_PORT || '7002',
        }
    }
};
