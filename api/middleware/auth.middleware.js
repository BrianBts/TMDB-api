const { validateToken } = require("../config/token");

class AuthMiddleware {
  static validateUser(req, res, next) {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(401).json({ message: "Missing authentication token" });
    }

    const [bearer, token] = authorizationHeader.split(" ");

    if (bearer !== "Bearer" || !token) {
      return res.status(401).send("Invalid authorization header");
    }

    const user = validateToken(token);

    if (!user) {
      return res.status(401).json({ message: "Invalid authorization token" });
    }

    req.user = user;
    next();
  }
}

module.exports = AuthMiddleware;
