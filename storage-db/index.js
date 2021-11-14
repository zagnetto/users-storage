require('dotenv').config();
const MicroMQ = require("micromq");
const config = require("../config");
const router = require("./storage.db.router");
const mongodbClient = require("./mongodb.client");

(async () => {

    const app = new MicroMQ({
        name: config.services.storageDb.name,
        rabbit: config.rabbitMQ,
    });

    router.init(app);

    await mongodbClient.init()
        .then(() => mongodbClient.createTestData())
        .then(() => app.start())
        .then(() => console.log(`Service ${config.services.storageDb.name} successfully started`))
        .catch(error => console.error(`Error during start service ${config.services.storageDb.name}::${error} `))
    ;

})()
