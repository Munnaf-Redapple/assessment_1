const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const passwordLib = require('./../libs/passwordLib');
const response = require('./../libs/responseLib')
const check = require('../libs/checkLib')
const JWT = require('../libs/tokenLib');
const appConfig = require('../../config/appConfig');
const eventEmitter = appConfig.eventEmitter;

/* Models */
const UserModel = mongoose.model('User')

// start user signup function 

let signUpFunction = async (req, res) => {
    let password = await passwordLib.hash(req.body.password)

    let newUser = new UserModel({
        username: req.body.username,
        password: password,
        user_age: req.body.user_age,
        user_gender: req.body.user_gender,
        remarks: req.body.remarks,
        profile_photo: req.body.profile_photo,
    });

    try {

        let userdetailsData = await newUser.save();
        let apiResponse = response.generate(0, ` Success`, userdetailsData);
        res.status(200);
        res.send(apiResponse);


    } catch (err) {
        let apiResponse = response.generate(0, ` ERROR : ${err.message}`, {});
        res.status(410);
        res.send(apiResponse);
    }
}


let signInFunction = async (req, res) => {
    try {
        let userDetails = await UserModel.findOne({username: req.body.username }).lean();
        console.log('userDetails =====',userDetails);
        if (!check.isEmpty(userDetails)) {
            let verify_pass = await passwordLib.verify(req.body.password, userDetails.password);
            console.log('verify_pass',verify_pass)
            if (verify_pass) {
            let resObj = {
                user_id: userDetails._id,
                username: userDetails.username,
                user_age: userDetails.user_age,
                user_gender: userDetails.user_gender,
                remarks: userDetails.remarks,
                profile_photo: userDetails.profile_photo,
            }
            let token = await JWT.generateToken(resObj);
            resObj.token = token;

            let apiResponse = response.generate(0, ` Success`, resObj);
            res.status(200);
            res.send(apiResponse);
        } else {
            let apiResponse = response.generate(0, ` ERROR : Wrong Password`, {});
            res.status(410);
            res.send(apiResponse)
        }
        } else {
            let apiResponse = response.generate(0, ` ERROR : User Not Register`, {});
            res.status(410);
            res.send(apiResponse)
        }
    } catch (err) {
        let apiResponse = response.generate(0, ` ERROR : ${err.message}`, {});
        res.status(410);
        res.send(apiResponse)
    }
}

let profileDetailsFunction = async (req, res) => {

    try {
        let record = await UserModel.find({ status: 'active', username:  req.body.username });

        let apiResponse = response.generate(0, ` Success`, record);
        res.status(200);
        res.send(apiResponse);
    } catch (err) {
        let apiResponse = response.generate(0, ` ERROR : ${err.message}`, {});
        res.status(410);
        res.send(apiResponse);
    }
}

let listFunction = async (req, res) => {

    try {
        let record = await UserModel.find({ status: 'active'}).lean();
        let apiResponse = response.generate(0, ` Success`, record);
        res.status(200);
        res.send(apiResponse);
    } catch (err) {
        let apiResponse = response.generate(0, ` ERROR : ${err.message}`, {});
        res.status(410);
        res.send(apiResponse);
    }
}


let updateFunction = async (req, res) => {

    try {
        let reqbody = req.body;
        let updateUserData = {};
        for (const property in reqbody) {
            updateUserData[property] = reqbody[property];
        }
       let userDeatils= await UserModel.findOneAndUpdate({ username: req.body.username }, updateUserData, { new: true });
        let apiResponse = response.generate(0, ` Success`, userDeatils);
        res.status(200);
        res.send(apiResponse);
    } catch (err) {
        // Handle other MongoDB errors
        let apiResponse = response.generate(1, ` ERROR : ${err.message}`, {});
        res.status(410);
        res.send(apiResponse)
    }
}

module.exports = {

    signUpFunction: signUpFunction,
    signInFunction: signInFunction,
    profileDetailsFunction: profileDetailsFunction,
    listFunction: listFunction,
    updateFunction: updateFunction

}