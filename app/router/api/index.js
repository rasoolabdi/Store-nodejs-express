const { Router } = require("express");
const homeController = require("../../controllers/api/home.controller");


const router = Router();

router.post("/" , homeController.indexPage);

module.exports = {
    HomeRoutes : router
}