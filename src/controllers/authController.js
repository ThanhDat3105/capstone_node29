const { errolCode } = require("../config/response");
const { checkToken } = require("../config/jwt");

const guard = (req, res, next) => {
  try {
    let { token } = req.headers;

    checkToken(token);

    next();
  } catch (error) {
    errolCode(res, error.message);
  }
};
module.exports = { guard };
