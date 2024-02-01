const dbConfig = require('./dbConfig.json')[process.env.NODE_ENV]
let admin = require('firebase-admin');
const serviceAccount = require("./heartsfantasy-5558a-firebase-adminsdk-erxkq-1a7ace7378.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
const events = require('events');
const eventEmitter = new events.EventEmitter();
const rngClass = require('../src/algo/rng');
const pRNG = new rngClass();
const rzp = require('razorpay');
const razp = new rzp({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET
});
let appConfig = {};

appConfig.eventEmitter = eventEmitter;
appConfig.allowedCorsOrigin = "*";

appConfig.apiVersion = '/api/v1';
appConfig.socketNameSpace = 'wsio';
appConfig.sessionExpTime = (60*60);
appConfig.otpLinkExpTime = (150);
appConfig.pRNG = pRNG;
appConfig.razp = razp;
appConfig.admin = admin;
appConfig.db = {
    uri: `mongodb://${dbConfig.username}:${encodeURIComponent(dbConfig.password)}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}?authSource=admin`
  };


appConfig.baseUrl='http://localhost:5000/api/v1/';


module.exports = appConfig;