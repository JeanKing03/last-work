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

routerImage.route("/").post(create).get(getAll);
routerImage.route("/:id").get(getOne).put(update).delete(remove);

module.exports = routerImage;
