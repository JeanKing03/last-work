const express = require("express");
const routerUser = require("./routers/user.router");
const routerCity = require("./routers/city.routers");
const router = express.Router();

// colocar las rutas aquí
router.use("/users", routerUser);
router.use("/cities", routerCity);

module.exports = router;
