const { Router } = require("express");
const userController = require("../../controllers/admin/user/user.controller");
const router = Router();

router.get("/allUsers" , userController.getAllUsers);

module.exports = {
    AdminApiUserRouter : router
}
