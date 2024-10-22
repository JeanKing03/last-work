const express = require("express");
const routerUser = require("./routers/user.router");
const routerCity = require("./routers/city.routers");
const routerHotel = require("./routers/hotel.routers");
const routerBooking = require("./routers/booking.routers");
const routerImage = require("./routers/image.routers");

const router = express.Router();

// colocar las rutas aquí
router.use("/users", routerUser);
router.use("/cities", routerCity);
router.use("/hotels", routerHotel);
router.use("/bookings", routerBooking);
router.use("/images", routerImage);

module.exports = router;
