const { Router } = require("express");
const userController = require("../../controllers/admin/user/user.controller");
const router = Router();

router.get("/allUsers" , userController.getAllUsers);
router.patch("/update-profile" , userController.updateUserProfile);

module.exports = {
    AdminApiUserRouter : router
}
