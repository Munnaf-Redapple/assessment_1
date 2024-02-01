const response = require('../libs/responseLib');
const Joi = require('joi');
const mongoose = require('mongoose');
const axios = require('axios');
/* Models */
const UserModel = mongoose.model('User');


let signUpValidate = async(req, res, next) => {

    try {
        const value = signupValidateSchema.validate(req.body);
        if (value.hasOwnProperty('error')) {
            throw new Error(value.error);
        } else {
            next();
        }

    } catch (err) {
        console.log(err);
        let apiResponse = response.generate(1, ` ERROR : ${err.message}`, {});
        res.status(403);
        res.send(apiResponse)
    }
}

const signupValidateSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    user_age: Joi.string().required(),
    user_gender: Joi.string().required(),
    remarks: Joi.string().allow(null),
    profile_photo: Joi.string().required(),
});


let signInValidate = async(req, res, next) => {

    try {
        const value = signinValidateSchema.validate(req.body);
        if (value.hasOwnProperty('error')) {
            throw new Error(value.error);
        } else {
            next();
        }

    } catch (err) {
        console.log(err);
        let apiResponse = response.generate(1, ` ERROR : ${err.message}`, {});
        res.status(403);
        res.send(apiResponse)
    }
}

const signinValidateSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});


let updateValidate = async(req, res, next) => {

    try {
        const value = updateValidateSchema.validate(req.body);
        if (value.hasOwnProperty('error')) {
            throw new Error(value.error);
        } else {
            next();
        }

    } catch (err) {
        console.log(err);
        let apiResponse = response.generate(1, ` ERROR : ${err.message}`, {});
        res.status(403);
        res.send(apiResponse)
    }
}

const updateValidateSchema = Joi.object({
    user_age: Joi.string().required(),
    user_gender: Joi.string().required(),
    remarks: Joi.string().allow(null),
    profile_photo: Joi.string().required(),
});



module.exports = {
    signUpValidate: signUpValidate,
    signInValidate: signInValidate,
    updateValidate: updateValidate,
}