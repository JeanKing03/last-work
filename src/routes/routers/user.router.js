const express = require("express");
const {
  create,
  getAll,
  getOne,
  update,
  remove,
  login,
  logged,
} = require("../../controllers/user.controllers");
const hashPassword = require("../../middlewares/hashPassword.middleware");
const validateUser = require("../../middlewares/validateUser.middleware");
const encryptCredentials = require("../../middlewares/tokenLogin.middleware");
const verifyJWT = require("../../utils/verifyJWT");

const routerUser = express.Router();

routerUser.route("/").post(hashPassword, create).get(verifyJWT, getAll);
routerUser.route("/login").post(validateUser, encryptCredentials, login);
routerUser.route("/me").get(verifyJWT, logged);

routerUser
  .route("/:id")
  .get(verifyJWT, getOne)
  .put(verifyJWT, update)
  .delete(verifyJWT, remove);

module.exports = routerUser;
