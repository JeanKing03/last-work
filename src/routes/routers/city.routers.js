const express = require("express");
const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require("../../controllers/city.controllers");
const verifyJWT = require("../../utils/verifyJWT");

const routerCity = express.Router();

routerCity.route("/").post(verifyJWT, create).get(getAll);
routerCity
  .route("/:id")
  .get(verifyJWT, getOne)
  .put(verifyJWT, update)
  .delete(verifyJWT, remove);

module.exports = routerCity;
