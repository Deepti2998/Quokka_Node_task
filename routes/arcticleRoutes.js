const express = require('express');
const router = express.Router();
const articleController = require('../controllers/arcticleController');
const auth = require("../middlewares/auth");

// Create an article
router.post('/create', auth.validateToken, articleController.createArticle);

// Update an article
router.put('/update', auth.validateToken, articleController.updateArticle);

// Delete an article
router.delete('/delete', auth.validateToken, articleController.deleteArticle);

// View articles
router.get('/view', articleController.viewArticles);

module.exports = router;
