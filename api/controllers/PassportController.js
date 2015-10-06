'use strict';

var passport = require('passport');

module.exports = {
  register: function (req, res) {
    var params = {username: req.body.username, password: req.body.password};

    User.create(params).exec(function(err, user) {
      if (err) {
        res.serverError(err);
      }
      else {
        res.send(user);
      }
    });
  },

  login: function (req, res, next) {
    passport.authenticate('local', {failureRedirect: '/login'}, function (err, user, response) {
      if (err) {
        return next(err);
      }

      if (user) {
        res.json(response);
      }
      else {
        res.json({message: 'Bad username/password combination'});
      }
    })(req, res, next);
  },

  /***** Facebook Endpoints *****/

  facebookAuth: function(req, res, next) {
      passport.authenticate('facebook', { scope: ['email', 'user_about_me']})(req, res, next);
  },

  facebookCallback: function(req, res, next) {
    passport.authenticate('facebook', function(err, user) {
      res.json(user);
    })(req, res, next);
  },

  logout: function (req, res) {
    delete req.logout();
    res.json({success: true})
  }
}