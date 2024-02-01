const userController = require("./../controllers/userController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')
const validate = require('./../middlewares/userValidator')


module.exports.setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}`;
    app.post(`${baseUrl}/user/signup`, validate.signUpValidate, userController.signUpFunction);
    app.post(`${baseUrl}/user/login`, validate.signInValidate, userController.signInFunction);
    app.get(`${baseUrl}/user/details`,auth.isAuthorized, userController.profileDetailsFunction);
    app.get(`${baseUrl}/user/list`,auth.isAuthorized, userController.listFunction);
    app.post(`${baseUrl}/user/update`,auth.isAuthorized, validate.updateValidate, userController.updateFunction);
}