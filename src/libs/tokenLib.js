const jwt = require('jsonwebtoken');
const shortid = require('shortid');
const secretKey = process.env.ENC_KEY;
const time = require('./timeLib');
const config = require('../../config/appConfig');



let generateToken = (data) => {
    return new Promise((resolve, reject) => {
        try {
            let claims = {
                jwtid: shortid.generate(),
                iat: Date.now(),
                exp: Math.floor(Date.now() / 1000) + config.sessionExpTime,
                sub: 'authToken',
                iss: 'pokerEngine',
                data: data
            }
            let tokenDetails = {
                token: jwt.sign(claims, secretKey),
                secret: secretKey
            }
            resolve(tokenDetails);
        } catch (err) {
            reject(err);
        }
    });
}

let verifyClaim = (token, secret) => {
        // verify a token symmetric
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, function(err, decoded) {
                if (err) {
                    reject(err)
                } else {
                    resolve(decoded);
                }


            });
        })


    } // end verify claim 

let verifyClaimWithoutSecret = (token, cb) => {
        // verify a token symmetric
        jwt.verify(token, secretKey, function(err, decoded) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, decoded);
            }


        });


    } // end verify claim 




module.exports = {
    generateToken: generateToken,
    verifyToken: verifyClaim,
    verifyClaimWithoutSecret: verifyClaimWithoutSecret
}