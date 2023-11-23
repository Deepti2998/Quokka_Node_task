module.exports ={
    MESSAGE: {
        success: {
          fetchSuccess: "Record fetched successfully.",
          loginsuccess: "User logged in successfully",
          userAdded: "User has been added successfully",
          articleCreated: "article Created successfully",
          articleUpdated:"article Updated successfully",
          articleDeleted:"article Deleted successfully",
        

        },
        error: {
          commonError: "Something went wrong.",
          badRequest: "Invalid request.",
          internalServer: "Internal server error.",
          emailAlreadyRegistered: "Email already registered",
          emailIsRequired: "Email is required",
          invalidEmail: "Email is not registered with us",
          unAuthorized: "You are not authorized.",
          userNotFound: "User does not Exist",
          userAlreadyExist: "This User already exist",
          incorrectPassword: "Incorrect Password",
          accountDoesnotExist:"Account Does not Exist",
          entityNotFound:"Entity not found"
        },
    
      },

    STATUS: {
        success: 200,
        unauth: 401,
        forbidden: 403,
        internalServer: 500,
        badRequest: 400
      },
      defaultServerResponse: {
        status: 400,
        success: false,
        message: '',
        body: {}
      },

      CUSTOM_JOI_MESSAGE: {
        name_msg: {
          max: "Full Name can not have more than 25 characters.",
          required: "Please Enter Your First Name."
        },
        phone_no_msg : {
          pattern: "Please enter a valid phone no"
        }
      },
}