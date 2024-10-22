const express = require("express");
const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require("../../controllers/image.controllers");
const verifyJWT = require("../../utils/verifyJWT");

const routerImage = express.Router();

routerImage.route("/").post(verifyJWT, create).get(getAll);
routerImage
  .route("/:id")
  .get(verifyJWT, getOne)
  .put(verifyJWT, update)
  .delete(verifyJWT, remove);

module.exports = routerImage;
