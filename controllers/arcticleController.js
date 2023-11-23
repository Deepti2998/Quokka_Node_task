const articleService = require('../services/articleService');
const utilityFunction = require('../utils/utilityFunction');
const constants = require('../utils/constants'); 

// Create an article
const createArticle = async (req, res) => {
  try {
    const responseFromService = await articleService.createArticle(req.body);
    utilityFunction.successResponse(res, responseFromService, responseFromService?.message || constants.MESSAGE.success.articleCreated);
  } catch (error) {
    console.error(error);
    utilityFunction.errorResponse(res, error, error.message, constants.STATUS.badRequest);
  }
};

// Update an article
const updateArticle = async (req, res) => {
  try {
    const responseFromService = await articleService.updateArticle(req.body);
    utilityFunction.successResponse(res, responseFromService, responseFromService?.message || constants.MESSAGE.success.articleUpdated);
  } catch (error) {
    console.error(error);
    utilityFunction.errorResponse(res, error, error.message, constants.STATUS.badRequest);
  }
};

// Delete an article
const deleteArticle = async (req, res) => {
  try {
    const responseFromService = await articleService.deleteArticle(req.body);
    utilityFunction.successResponse(res, responseFromService, responseFromService?.message || constants.MESSAGE.success.articleDeleted);
  } catch (error) {
    console.error(error);
    utilityFunction.errorResponse(res, error, error.message, constants.STATUS.badRequest);
  }
};

// View articles
const viewArticles = async (req, res) => {
  try {
    const responseFromService = await articleService.getArticles(req.query);
    utilityFunction.successResponse(res, responseFromService, responseFromService?.message || constants.MESSAGE.success.fetchSuccess);
  } catch (error) {
    console.error(error);
    utilityFunction.errorResponse(res, error, error.message, constants.STATUS.badRequest);
  }
};

module.exports = {
  createArticle,
  updateArticle,
  deleteArticle,
  viewArticles
};
