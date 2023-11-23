const models = require('../models');
const mongoose = require('mongoose');
const constants = require('../utils/constants');
    Schema = mongoose.Schema,
    ObjectId = mongoose.Types.ObjectId;

 

// Service for creating an article
const createArticle = async (params) => {
  try {
    const { title, content, author } = params;
    const article = new models.Article({
      title,
      content,
      author,
    });

    return await article.save();
  } catch (error) {
    throw error;
  }
};

// Service for updating an article
const updateArticle = async (params) => {
  try {
    const { title, content, articleId } = params;
    let dataExist = await models.Article.findOne({
      _id: articleId,
    },)

    if(!dataExist){
      let message = constants.MESSAGE.error.entityNotFound;
      throw { message };
    }

    const data = await models.Article.findOneAndUpdate(
      {
        _id: articleId,
      },
      {
        title,
        content,
      },
      { new: true }
    );
    return data
  } catch (error) {
    throw error;
  }
};

// Service for deleting an article
const deleteArticle = async (params) => {
  try {
    const {articleId } = params;

    let dataExist = await models.Article.findOne({
      _id: articleId,
    },)

    if(!dataExist){
      let message = constants.MESSAGE.error.entityNotFound;
      throw { message };
    }

     await models.Article.findOneAndDelete({
      _id: articleId,
    });
     return
  } catch (error) {
    throw error;
  }
};

// Service for viewing all articles or articles with filters
const getArticles = async (query) => {
  try {
    const { search } = query;

    if (search) {
      query.title = { $regex: new RegExp(search, 'i') };
    }

    const articles = await models.Article.find(query);
    return articles;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createArticle,
  updateArticle,
  deleteArticle,
  getArticles,
};
