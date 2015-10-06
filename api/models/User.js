var md5 = require('MD5');

module.exports = {
  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    },
  },
  beforeCreate: function(user, cb) {
    user.password = md5(user.password);
    cb();
  }
};