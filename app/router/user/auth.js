const { Router } = require("express");
const userAuthController = require("./../../controllers/user/auth/auth.controller")
const router = Router();

router.post("/get-otp" , userAuthController.getOtp);
router.post("/check-otp" , userAuthController.checkOtp);
router.post("/refresh-token" , userAuthController.refreshToken);

module.exports = {
    UserAuthRoutes: router
}