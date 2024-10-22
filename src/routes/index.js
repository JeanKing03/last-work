const express = require("express");
const routerUser = require("./routers/user.router");
const routerCity = require("./routers/city.routers");
const routerHotel = require("./routers/hotel.routers");

const router = express.Router();

// colocar las rutas aquí
router.use("/users", routerUser);
router.use("/cities", routerCity);
router.use("/hotels", routerHotel);

module.exports = router;
