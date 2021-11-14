require('dotenv').config();
const MicroMQ = require("micromq");
const config = require("../config");
const router = require("./storage.cache.router");


(async () => {

    const app = new MicroMQ({
        name: config.services.storageCache.name,
        rabbit: config.rabbitMQ,
    });

    router.init(app);

    await app.start()
        .then(() => console.log(`Service ${config.services.storageCache.name} successfully started`))
        .catch(error => console.error(`Error during start service ${config.services.storageCache.name}::${error} `))
    ;

})()
