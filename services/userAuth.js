const models = require('../models');

const constants = require("../utils/constants")
const utilityFunction = require("../utils/utilityFunction");
const { signToken } = require('../middlewares/auth');
const { model } = require('mongoose');
bcrypt = require("bcrypt");
const mongoose = require('mongoose');
    Schema = mongoose.Schema,
    ObjectId = mongoose.Types.ObjectId;


module.exports = {
    login: async (params) => {
        try {
           
            const {email, password} = params
            const user = await models.User.findOne({ email }, { _id: 1, username: 1, email: 1, password }).lean()
            if (user) {
                const token = signToken(user, true);
                const passwordMatched =await utilityFunction.comparePassword(password, user.password)

                  if (!passwordMatched) {
                    let message = constants.MESSAGE.error.incorrectPassword;
                    throw { message };
                  }
                  delete user.password
                return { token, user }
            } else {
                let message = constants.MESSAGE.error.accountDoesnotExist
                throw { message }
            }
        } catch (error) {
            throw error
        }
    },
    signup: async (params) => {
        try {
            const {username,email,password}=params
            const userExist = await models.User.findOne({ email: email }, { _id: 1, username: 1, email: 1})
            if (!userExist) {
                hashedPass = await bcrypt.hash(password, 10);
                let users = await models.User({
                    username: username,
                    email: email,
                    password: hashedPass
                });
                let userData = await users.save()
                let user = {
                    _id: userData._id,
                    name: userData.name,
                    email: userData.email,
                }
                const token = signToken(user, true);
                return { user, token }
            } else {
                let message = constants.MESSAGE.error.userAlreadyExist
                return { message }
            }
        } catch (error) {
            throw error
        }
    },

    getUserProfile: async (userId)=> {
        try {
          const user = await models.User.findById(userId, { password: 0 });
          if (!user) {
            let message = constants.MESSAGE.error.accountDoesnotExist
            throw { message }          }
          return user;
        } catch (error) {
          throw error;
        }
      }

}