const jwt = require("jsonwebtoken");
const catchError = require("../utils/catchError");

const encryptCredentials = catchError(async (req, res, next) => {
  const { userLogged } = req.body;

  const token = jwt.sign({ userLogged }, process.env.SECRET_TOKEN, {
    expiresIn: "1d",
  });
  req.body.token = token;
  next();
});

module.exports = encryptCredentials;
