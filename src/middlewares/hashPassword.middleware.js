const bcrypt = require("bcrypt");

const hashPassword = async (req, res, next) => {
  const { password } = req.body;

  if (!password)
    return res.status(404).json({ message: "Password Can't Be Null!" });

  const passwordHashed = await bcrypt.hash(password, 10);

  req.body.passwordHashed = passwordHashed;
  next();
};

module.exports = hashPassword;
