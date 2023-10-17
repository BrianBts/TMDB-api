const User = require("../models/Users.models");

class AuthServices {
  static async getUserbyEmail(email) {
    return await User.findOne({ email: email }).exec();
  }

  static async createUser(data) {
    return await User.create(data);
  }
}

module.exports = AuthServices;
