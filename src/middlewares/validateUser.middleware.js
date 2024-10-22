const bcrypt = require("bcrypt");

const { getUserServices } = require("../services/user.services");
const catchError = require("../utils/catchError");

const validateUser = catchError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ message: "Email Can't Be Null!" });

  const user = await getUserServices(email);
  if (!user) return res.status(401).json({ message: "Invalid Credential!" });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ message: "Invalid Credential!" });
  req.body.userLogged = user;
  next();
});

module.exports = validateUser;
