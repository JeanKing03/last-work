const express = require("express");
const {
  create,
  getAll,
  getOne,
  update,
  remove,
} = require("../../controllers/review.controllers");
const verifyJWT = require("../../utils/verifyJWT");

const routerReview = express.Router();

routerReview.route("/").post(verifyJWT, create).get(getAll);
routerReview
  .route("/:id")
  .get(verifyJWT, getOne)
  .put(verifyJWT, update)
  .delete(verifyJWT, remove);

module.exports = routerReview;
