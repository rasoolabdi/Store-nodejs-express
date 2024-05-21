const { Router } = require("express");
const userController = require("../../controllers/admin/user/user.controller");
const { checkPermission } = require("../../middlewares/permission.guard");
const { PERMISSIONS } = require("../../utils/constant");
const router = Router();

router.get("/allUsers" , checkPermission([PERMISSIONS.ADMIN]) ,userController.getAllUsers);
router.patch("/update-profile" , userController.updateUserProfile);
router.get("/profile" , checkPermission([]) , userController.getProfile)

module.exports = {
    AdminApiUserRouter : router
}
