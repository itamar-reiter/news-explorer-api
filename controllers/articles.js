const Articles = require('../models/article');
const { NOT_FOUND_ERROR_CODE } = require('../utils/errors/errorCodes');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');
const InvalidDataError = require('../utils/errors/InvalidDataError');
const ServerError = require('../utils/errors/ServerError');
const NotFoundError = require('../utils/errors/NotFoundError');

const getArticles = (req, res, next) => Articles.find({ owner: req.user._id })
  .then((articles) => {
    Object.values(articles).forEach((article) => {
      delete article._doc.owner;
    });
    res.status(200).send(articles);
  })
  .catch(next);

const saveArticle = (req, res, next) => {
  const owner = req.user._id;
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Articles.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner,
  })
    .then((article) => {
      delete article._doc.owner;
      res.status(200).send(article);
    })
    .catch((err) => {
      console.log(err);
      next(new ServerError());
    });
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  Articles.findOne({ _id: articleId })
    .orFail(() => {
      throw new NotFoundError(`not found card with ${articleId} id`);
    })
    .then((article) => {
      if (!article.owner.equals(req.user._id)) {
        return next(new UnauthorizedError("You can't delete this article"));
      }
      return article.remove()
        .then(() => res.status(200).send({ message: 'article has been deleted' }));
    })
    .catch((err) => {
      console.log(err);
      if (err.name === 'CastError') {
        next(new InvalidDataError('invalid user id'));
      } else if (err.statusCode === NOT_FOUND_ERROR_CODE) {
        next(new NotFoundError('Article not found'));
      } else {
        next(new ServerError());
      }
    });
};

module.exports = { getArticles, saveArticle, deleteArticle };
