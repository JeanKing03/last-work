const express = require("express");
const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require("../../controllers/booking.controllers");
const verifyJWT = require("../../utils/verifyJWT");

const routerBooking = express.Router();

routerBooking.route("/").post(verifyJWT, create).get(getAll);
routerBooking
  .route("/:id")
  .get(verifyJWT, getOne)
  .put(verifyJWT, update)
  .delete(verifyJWT, remove);

module.exports = routerBooking;
