/* function for sending the success response */
module.exports.successResponse = (res, params, message, statusCode = 200) => {
    let response = {
        success: true,
        message: message,
        status: statusCode,
        data: params,
        error: null
    };

    return res.status(response.status).json(response);
}

module.exports.errorResponse = (res, params, message, statusCode = 400) => {
    let response = {
        success: false,
        message: message,
        status: statusCode,
        data: null,
        error: params
    };

    return res.status(response.status).json(response);
}

module.exports.comparePassword = async (myPlaintextPassword, hash) => {
    return bcrypt.compare(myPlaintextPassword, hash);
  };