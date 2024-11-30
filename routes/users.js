const usersRouter = require('express').Router();
const { idValidator, prefferencesValidator } = require('../middleware/celebrateValidators');
const { getUserData, editPreferences } = require('../controllers/users');

usersRouter.get('/users/me', idValidator, getUserData);
usersRouter.patch('/users/me/newsPrefference', prefferencesValidator, editPreferences);
usersRouter.delete('/users/me/newsPrefference', prefferencesValidator, editPreferences);

module.exports = usersRouter;
