const userAuth = require("../services/userAuth");
const utilityFunction = require("../utils/utilityFunction")
const constants = require("../utils/constants");
const models = require('../models');
const ver = require('../middlewares/auth');
const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Types.ObjectId;


module.exports = {
    login: async (req, res) => {

        try {
            const responseFromService = await userAuth.login(req.body);
            utilityFunction.successResponse(res, responseFromService, responseFromService?.message || constants.MESSAGE.success.loginsuccess);
        } catch (error) {
            console.log(error)
            utilityFunction.errorResponse(res, error, error.message, constants.STATUS.badRequest);
        }

    },
    signup: async (req, res) => {
        try {
            const responseFromService = await userAuth.signup(req.body);
            utilityFunction.successResponse(res, responseFromService, responseFromService?.message || constants.MESSAGE.success.userAdded);
        } catch (error) {
            console.log(error)
            utilityFunction.errorResponse(res, error, error.message, constants.STATUS.badRequest);
        }


    },

     getUserProfile: async (req, res) => {
        try {
          const responseFromService = await userAuth.getUserProfile(req.user);
          utilityFunction.successResponse(res, responseFromService, responseFromService?.message || constants.MESSAGE.success.fetchSuccess);
        } catch (error) {
          console.error(error);
          utilityFunction.errorResponse(res, error, error.message, constants.STATUS.notFound);
        }
      }

      

}



