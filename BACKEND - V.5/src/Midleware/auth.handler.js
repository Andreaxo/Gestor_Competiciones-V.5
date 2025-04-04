const { errors } = require('../network/errors');
const { app } = require('../config.js');

function checkApiKey(req, res, next) {
    const apiKey = req.headers['api'];
    if (apiKey == app.apiKey) {
        next();
    } else {
        next(errors("API key inválida", 401));
    }
}

module.exports = { checkApiKey };
