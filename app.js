const envConf = require('dotenv').config({ debug: process.env.DEBUG });

if (envConf.error) {
    throw envConf.error
}
const express = require('express');
const database = require('./www/db/db');
const appConfig = require('./config/appConfig');
const routeLoggerMiddleware = require('./src/middlewares/routeLogger');
const globalErrorMiddleware = require('./src/middlewares/appErrorHandler');
const fs = require('fs');
const path = require('path');


const app = express();
const schemaPath = './src/schema';
//Bootstrap models
fs.readdirSync(schemaPath).forEach(function(file) {
    if (~file.indexOf('.js')) require(schemaPath + '/' + file)
});
// end Bootstrap models
// app.set('views','views');
// app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routeLoggerMiddleware.logIp);
app.use(globalErrorMiddleware.globalErrorHandler);

app.all(appConfig.allowedCorsOrigin, function(req, res, next) {
    res.header("Access-Control-Allow-Origin", appConfig.allowedCorsOrigin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept,token,key,Authorization,Referer,User-Agent");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    next();
});

app.get('/', (req, res) => {
    res.render('razorpay.ejs');
});

// Bootstrap route
const routesPath = './src/routes';
fs.readdirSync(routesPath).forEach(function(file) {
    if (~file.indexOf('.js')) {
        let route = require(routesPath + '/' + file);
        route.setRouter(app);
    }
});
// end bootstrap route

/* Start Database*/

database.startDB(app, process.env.DATABASE_TYPE);