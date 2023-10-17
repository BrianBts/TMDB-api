const { generateToken } = require("../config/token");
const AuthServices = require("../services/auth.services");

class AuthControllers {
  static async register(req, res) {
    try {
      const { email } = req.body;

      const user = await AuthServices.getUserbyEmail(email);

      if (user) {
        return res.status(400).send("This mail has been already registered!");
      }

      await AuthServices.createUser(req.body);

      res.status(201).json("User register succed");
    } catch (error) {
      res.status(401).json("Error at register");
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await AuthServices.getUserbyEmail(email);

      if (!user) {
        return res.status(404).send("This mail does not exists!");
      }

      const isValid = await user.validatePassword(password);

      if (!isValid) {
        return res.status(401).send("Wrong password! Please try again");
      }

      const payload = {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
      };

      const token = generateToken(payload);

      const response = { ...payload, token };

      res.send(response);
    } catch (error) {
      res.status(500).json("Error at login");
    }
  }

  static async me(req, res) {
    res.send(req.user);
  }
}

module.exports = AuthControllers;
