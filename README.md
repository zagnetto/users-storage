# Getting started

## Run with docker
##### If you don't have mongodb run: 
docker pull mongo:5

docker run -d  -p `27017:27017` mongo:5

##### If you don't have rabbitmq run:
docker pull rabbitmq:3-management

docker run -d --hostname my-rabbit -p `15672:15672` -p `5672:5672` rabbitmq:3-management

##### Build and run image
docker build ./ --no-cache --tag users-storage

docker run  -p `7000:7000`  --network=host  users-storage

## Run with yarn/npm
npm run start

yarn start

#### ENV variables:
APP_RABBIT_MQ_URL (`amqp://127.0.0.1:5672` by default)

APP_MONGODB_URL (`mongodb://127.0.0.1:27017` by default)

SVC_API_PORT (`7000` by default)

SVC_STORAGE_CACHE_PORT (`7001` by default)

SVC_STORAGE_DB_PORT (`7002` by default)

##`P.S.` During start you will need to wait few seconds for generation test data
