const { Router } = require("express");
const { HomeRoutes } = require("./api");
const { UserAuthRoutes } = require("./user/auth");



const router = Router();
router.use("/user" , UserAuthRoutes);
router.use("/" , HomeRoutes);

module.exports = {
    AllRoutes: router
}