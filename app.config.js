(function () {
    'use strict';
    module.exports = {
        NODE_SERVER_PORT: 3000,
        REQUEST_HEADER: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
            'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
            'Access-Control-Allow-Credentials': true
        }
    };
})();