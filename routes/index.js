const indexRouter = require('express').Router();
const articlesRouter = require('./article');
const errorRouter = require('./userError');
const usersRouter = require('./users');

// user
indexRouter.use('/', usersRouter);

// articles
indexRouter.use('/', articlesRouter);

// route error
indexRouter.use('/', errorRouter);

module.exports = indexRouter;
