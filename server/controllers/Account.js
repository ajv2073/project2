const models = require('../models');

const { Account } = models;

const loginPage = (req, res) => res.render('login');

// const signupPage = (req, res) => {
//     return res.render('signup');
// };

const contentPage = (req, res) => res.render('content');

const logout = (req, res) => {
  req.session.destroy();
  return res.redirect('/');
};

const login = (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;

  if (!username || !pass) {
    return res.status(400).json({ error: 'All fields are required dummy!' });
  }

  return Account.authenticate(username, pass, (err, account) => {
    if (err || !account) {
      return res.status(401).json({ error: 'YOU PUT IN THE WRONG USERNAME AND/OR PASSWORD!' });
    }

    req.session.account = Account.toAPI(account);

    return res.json({ redirect: '/maker' });
  });
};

const signup = async (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;

  if (!username || !pass || !pass2) {
    return res.status(400).json({ error: 'All fields are required dummy!' });
  }

  if (pass !== pass2) {
    return res.status(400).json({ error: 'Passwords do not match stupid!' });
  }

  try {
    const hash = await Account.generateHash(pass);
    const newAccount = new Account({ username, password: hash });
    await newAccount.save();
    req.session.account = Account.toAPI(newAccount);
    return res.json({ redirect: '/maker' });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Dude, that username is already in use...' });
    }
    return res.status(500).json({ error: 'Wowzers! An error occured!' });
  }
};

// const changePassword = async (req, res) => {
//   console.log("trying to change password");
//   const newPass = `${req.body.newPass}`;
//   const newPass2 = `${req.body.newPass2}`;

//   if (newPass !== newPass2) {
//     return res.status(400).json({ error: 'Passwords do not match stupid!' });
//   }

//   try{
//     const hash = await Account.generateHash(newPass);
//   } catch(err) {

//   }
// }

module.exports = {
  loginPage,
  // signupPage,
  login,
  logout,
  signup,
  contentPage,
};
