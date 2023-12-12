const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getEntrys', mid.requiresLogin, controllers.Entry.getEntrys);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  // app.get('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signupPage);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/maker', mid.requiresLogin, controllers.Entry.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Entry.makeEntry);

  app.get('/content', controllers.Account.contentPage);

  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
