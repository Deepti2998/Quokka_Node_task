const jwt = require('jsonwebtoken');
const constants = require("../utils/constants");
const utilityFunction = require("../utils/utilityFunction");
const moment = require('moment');


const signToken = (user, keepLoggedInOptions, role) => {
    let payload = {
        _id: user._id,
        role: role,
    };

    let options = {};
    if (keepLoggedInOptions) {
        options = { expiresIn: process.env.JWT_EXTENDED_EXPIRY_TIME };
    }
    else
        options = { expiresIn: process.env.JWT_EXPIRY_TIME };
    return jwt.sign(payload, process.env.JWT_SECRET, options);
};

const validateToken = async (req, res, next) => {
    try {
        let token = req.headers.authorization || req.headers.token;
        if (token) {
            const decode = decodeToken(token, process.env.JWT_SECRET);
            if (decode) {
                req.user = decode
                next();
            } else {
                utilityFunction.errorResponse(res, {}, constants.MESSAGE.error.unAuthorized, constants.STATUS.unauth);
            }
        } else {
            utilityFunction.errorResponse(res, {}, constants.MESSAGE.error.unAuthorized, constants.STATUS.unauth);
        }
    }
    catch (err) {
        console.log(err)
        utilityFunction.errorResponse(res, err, constants.MESSAGE.error.unAuthorized, constants.STATUS.unauth);
    }

}
// To decode Token
const decodeToken = (token, secretKey) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (err) {
        let msg;
        if (err.message == 'jwt malformed' || err.message == 'invalid token' || err.message == 'invalid signature') {
            msg = 'errorTokenInvalid';
        } else if (err.message == 'jwt expired') {
            msg = 'errorTokenExpired';
        }
        throw new Error(msg || err);
    }
}
const validateTokenResetPassword = async (req) => {
    try {
        let token = req.token;
        if (token) {
            const decode = decodeToken(token, process.env.JWT_SECRET);
            if (decode) {
                return { user: decode }
            } else {
                utilityFunction.errorResponse(res, {}, constants.MESSAGE.error.unAuthorized, constants.STATUS.unauth);
            }
        } else {
            utilityFunction.errorResponse(res, {}, constants.MESSAGE.error.unAuthorized, constants.STATUS.unauth);
        }
    }
    catch (err) {
        console.log(err)
        utilityFunction.errorResponse(res, err, constants.MESSAGE.error.unAuthorized, constants.STATUS.unauth);
    }

}


module.exports = { signToken, validateToken, validateTokenResetPassword };
