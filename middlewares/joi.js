const utilityFunction= require("../utils/utilityFunction")
const constants = require("../utils/constants")
/* function for validating the schema */
const validateObjectSchema= (data, schema) => {
    const result = schema.validate(data);
    if (result.error) {
        const errorDetails = result.error.details.map(value => {
            return {
                message: value.message,
                path: value.path
            };
        });
        return errorDetails;
    }
    return null;
};
    

module.exports = {
    

    /* function for validating the request body */
    validateBody : (schema) => {
        //console.log(schema)
        return (req, res, next) => {
            const error = validateObjectSchema(req.body, schema);
            //console.log("response",error)
            if (error) {
            return utilityFunction.errorResponse(res, error, error[0].message.split('"').join(""),constants.STATUS.badRequest)
            }
            return next();
        }
    },

    /* function for validating the request params */
    validateQueryParams: (schema) => {
        return (req, res, next) => {
            const error = validateObjectSchema(req.query, schema);
            if (error) {
            return utilityFunction.errorResponse(res, error, error[0].message.split('"').join(""), constants.STATUS.badRequest)
            }
            return next();
        }
    },

    /* function for validating the request params */
    validateParams : (schema) => {
        return (req, res, next) => {
            const error = validateObjectSchema(req.params, schema);
            if (error) {
            return utilityFunction.errorResponse(res, error, error[0].message.split('"').join(""), constants.STATUS.badRequest)
            }
            return next();
        }
    }

}