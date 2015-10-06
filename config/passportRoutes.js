module.exports.routes = {
  'POST /register': {controller: 'PassportController', action: 'register'},
  'POST /login':    {controller: 'PassportController', action: 'login'},
  'GET  /logout':   {controller: 'PassportController', action: 'logout'},

  'GET /facebook': {controller: 'PassportController', action: 'facebookAuth'},
  'GET /facebook/callback':    {controller: 'PassportController', action: 'facebookCallback'}
};