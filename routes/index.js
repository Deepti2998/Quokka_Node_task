const express = require('express');
const routePrefix = `/node_task/api/v1`
const utilityFunction= require("../utils/utilityFunction")
const constants = require("../utils/constants");
const { Router } = require('express');

module.exports = function(Router) {
    Router.use(`${routePrefix}/user`, require("./userRoute"));
    Router.use(`${routePrefix}/article`, require("./arcticleRoutes"));

   
    Router.use((err, req, res, next) => {
        err.method_name = req.url
        utilityFunction.errorResponse(res, err, constants.MESSAGE.bad_request,constants.STATUS.badRequest)
    });
  }