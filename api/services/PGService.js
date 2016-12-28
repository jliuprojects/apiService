var promise = require('bluebird');
var options = {
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var config = sails.config;
var connectionInfo = config.connections[config.models.connection];
pgp.pg.defaults.poolSize = connectionInfo.poolSize;
var txMode = pgp.txMode;

var connectionString = connectionInfo.url + '?ssl=' + connectionInfo.ssl + '&pool=' + (connectionInfo.pool ? 'true' : 'false');
var db = pgp(connectionString);

module.exports = {
    'db': db,
};