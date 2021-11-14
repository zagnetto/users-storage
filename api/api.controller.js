const config = require('../config');

class ApiController {

    async handle(req, res, next) {
        try {
            let cacheExists = true;
            const action = this._getActionNameFromReq(req);
            const {mq, params, query} = req;

            let result = await this._getFromCache({mq, params, query, action});

            if (!result.response || result.status !== 200) {
                cacheExists = false;
                result = await this._getFromDb({mq, params, query, action});
            }


            res.status(result.status).json(result.response);

            await next();

            if (!cacheExists && result.response && result.status === 200) {
                await this._putCache({mq, params, query, action}, result.response)
                    .catch(err => console.error(`Error while try to pu cache:: ${err}`));
            }

        } catch (error) {
            console.error(`ApiController::${error}`)
            res.status(400).json({error});
        }
    }

    _getActionNameFromReq(req) {
        return `${req.baseUrl}${req.route.path}`
    }

    async _getFromDb({mq, action, query, params}) {
        return mq.ask(config.services.storageDb.name, {
            server: {
                action,
                meta: {
                    query,
                    params
                },
            },
        });
    }


    async _getFromCache({mq, action, params, query}) {
        return mq.ask(config.services.storageCache.name, {
            server: {
                action: 'CACHE::GET',
                meta: {action, params, query}
            },
        });
    }

    async _putCache({mq, action, params, query}, payload) {
        return mq.ask(config.services.storageCache.name, {
            server: {
                action: 'CACHE::PUT',
                meta: {action, params, query, payload}
            },
        });
    }

}

module.exports = new ApiController();
