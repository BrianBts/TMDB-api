const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET_PASSWORD;

function generateToken(payload) {
  const token = jwt.sign({ payload }, SECRET);
  return token;
}

function validateToken(token) {
  return jwt.verify(token, SECRET);
}

modeule.export = { generateToken, validateToken };
