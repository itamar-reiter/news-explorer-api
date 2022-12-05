const articlesRouter = require('express').Router();
const { getArticles, saveArticle, deleteArticle } = require('../controllers/articles');
const { saveArticleValidator, idValidator } = require('../middleware/celebrateValidators');

articlesRouter.get('/articles', getArticles);
articlesRouter.post('/articles', saveArticleValidator, saveArticle);
articlesRouter.delete('/articles/:articleId', idValidator, deleteArticle);

module.exports = articlesRouter;
