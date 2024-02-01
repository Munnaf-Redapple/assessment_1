const responseLib = require('../libs/responseLib');
const token = require('../libs/tokenLib');
const check = require('../libs/checkLib');
const appConfig = require('../../config/appConfig');

let isAuthorized = async(req, res, next) => {
    if (req.header('Authorization') && !check.isEmpty(req.header('Authorization'))) {
        let auth = req.header('Authorization');
        const actual_token = auth.split(" ")[1];
        token.verifyClaimWithoutSecret(actual_token, (err, decoded) => {
            if (err) {
                let apiResponse = responseLib.generate(1, `Authorization Failed : ${err.message}`, req.headers)
                res.send(apiResponse)
            } else {
                req["user"] = decoded.data;
                next()
            }
        });
    } else {
        let apiResponse = responseLib.generate(1, 'Authorization Token Is Missing In Request', req.headers)
        res.send(apiResponse)
    }
}


let firebaseAuth = async(req, res, next) => {
    if (req.header('token') && !check.isEmpty(req.header('token'))) {
        try {
            let checkAuth = await appConfig.admin.auth().verifyIdToken(req.header('token'));
            next();
        } catch (err) {
            let apiResponse = responseLib.generate(0, `${err.message}`, null)
            res.status(401).send(apiResponse)
        }
    } else {
        let apiResponse = responseLib.generate(0, 'AuthorizationToken Is Missing In Request', null)
        res.status(401).send(apiResponse)
    }
}

let isAuthorizedSocket = async(socket, next) => {
    try {
        let socketToken;
        console.log("JWT token,", socket.handshake);
        if (socket.handshake.headers.token || socket.handshake.query.token) {
            socketToken = socket.handshake.headers.token || socket.handshake.query.token;
        }

        if (!token) {
            console.log("Kindly provide the JWT token");
        }

        const decoded = await token.verifyToken(socketToken, process.env.ENC_KEY);

        if (!decoded) {
            console.log("Invalid token");
        }
        socket.user = decoded.data

        next();
    } catch (err) {

        //socket.emit('connection-ack', err)
        console.log('ERROR => ' + err);
        //res.status(401).json({message: err.message});
        // res.json({status:"error" , message: err.message});
    }
}

module.exports = {
    isAuthorized: isAuthorized,
    firebaseAuth: firebaseAuth,
    isAuthorizedSocket: isAuthorizedSocket
}