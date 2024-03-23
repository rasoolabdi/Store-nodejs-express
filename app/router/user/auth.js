const { Router } = require("express");
const userAuthController = require("./../../controllers/user/auth/auth.controller")


const router = Router();

// router.post("/login" , userAuthController.login);


module.exports = {
    UserAuthRoutes: router
}