const Joi = require('joi')
const constants = require("../utils/constants")
module.exports = {
    userSchema: Joi.object({
        username: Joi.string().max(25).required()
            .messages({
                "string.max": constants.CUSTOM_JOI_MESSAGE.name_msg.max,
                "string.empty": constants.CUSTOM_JOI_MESSAGE.name_msg.required,
                "any.required": constants.CUSTOM_JOI_MESSAGE.name_msg.required
            }),    
        email: Joi.string().trim().max(45).email().optional(),
        
    }),
    loginSchema: Joi.object({
        email: Joi.string().trim().max(45).email().optional(),
        password: Joi.string()
      .trim()
      .min(6)
      .regex(
        /^(?=.*[a-z])|(?=.*[A-Z])|(?=.*[0-9])|(?=.*[!@#\$%\^&\*])(?=.{6,})/
      )
      .required()
    })
}