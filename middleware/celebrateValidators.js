const { celebrate, Joi } = require('celebrate');
const { urlRegex, prefferencesRegex } = require('../utils/regex');

// mongoose default id
const mongooseDefaultIdValidator = Joi.string().alphanum().length(24);

const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const prefferencesValidator = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().pattern(prefferencesRegex),
  }),
})

const registerValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
    image: Joi.string().min(2).optional().allow(null, '')
  }),
});

const saveArticleValidator = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().pattern(urlRegex),
    image: Joi.string().required().pattern(urlRegex),
  }),
});

const idValidator = celebrate({
  body: Joi.object().keys({
    id: mongooseDefaultIdValidator,
  }),
});

module.exports = {
  registerValidator,
  loginValidator,
  saveArticleValidator,
  idValidator,
  prefferencesValidator
};
