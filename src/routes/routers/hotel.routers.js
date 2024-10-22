const express = require("express");
const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require("../../controllers/hotel.controllers");
const verifyJWT = require("../../utils/verifyJWT");

const routerHotel = express.Router();

routerHotel.route("/").post(verifyJWT, create).get(getAll);
routerHotel
  .route("/:id")
  .get(getOne)
  .put(verifyJWT, update)
  .delete(verifyJWT, remove);

module.exports = routerHotel;
