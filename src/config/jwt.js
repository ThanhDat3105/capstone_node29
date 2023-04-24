const jwt = require("jsonwebtoken");
const { KEY } = require("./config");

const createToken = (data) => {
  let token = jwt.sign({ data }, KEY, {
    expiresIn: "1y",
    algorithm: "HS256",
  });
  return token;
};

const checkToken = (token) => {
  return jwt.verify(token, KEY);
};

const descriptToken = (token) => {
  return jwt.decode(token);
};

module.exports = { createToken, checkToken, descriptToken };
