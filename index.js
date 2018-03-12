(function () {
    'use strict';

    // set up ======================================================================
    // get all the tools we need
    var express = require('express');
    var app = express();
    var mongoose = require('mongoose');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    var configDB = require('./server/Config/database.js');
    var CONFIG = require('./app.config'),
        cors = require('cors');
    // configuration ===============================================================
    mongoose.connect(configDB.url, { auth: { authdb: "admin" } }).then(function (success) {
        console.dir('success connect mongo db')
    }, function (error) {
        console.dir('error connect mongo db', error)
    }); 
    // set up our express application
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(cors());
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', CONFIG.REQUEST_HEADER['Access-Control-Allow-Origin']);
        res.setHeader('Access-Control-Allow-Methods', CONFIG.REQUEST_HEADER['Access-Control-Allow-Methods']);
        res.setHeader('Access-Control-Allow-Headers', CONFIG.REQUEST_HEADER['Access-Control-Allow-Headers']);
        res.setHeader('Access-Control-Allow-Credentials', CONFIG.REQUEST_HEADER['Access-Control-Allow-Credentials']);
        next();
    });
    app.use(cookieParser()); // read cookies (needed for auth)
    app.use(bodyParser.json()); // get information from html forms
    app.use('/', express.static('public'));
    app.set('port', (process.env.PORT || CONFIG.NODE_SERVER_PORT));
    // launch in http with 8000 port======================================================================
    var http = require('http');
    var appHttpServer = http.Server(app).listen(app.get('port'), function (err) {
        console.dir('Server started ' + app.get('port'))
    });
    require('./server/routes.js')(app); // load our routes and pass in our app
})();