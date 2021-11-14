require('dotenv').config();
const config = require('../config');
const express = require('express');
const router = require('./api.router');
const app = express();

const MicroMQ = require('micromq');
const mq = new MicroMQ({
    microservices: [config.services.storageDb.name, config.services.storageCache.name],
    name: config.services.api.name,
    rabbit: config.rabbitMQ,
});

app.use('/', (req, res, next) => {
    Object.assign(req, {mq});
    next();
});

app.use('/users', router);


mq.start();
app.listen(config.services.api.port, config.services.api.host, () =>
    console.log(`Service "${config.services.api.name}" listen http://${config.services.api.host}:${config.services.api.port}`)
);


