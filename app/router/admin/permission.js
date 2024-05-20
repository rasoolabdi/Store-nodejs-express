const { Router } = require("express");
const permissionController = require("../../controllers/admin/RBAC/permission.controller");


const router = Router();

router.get("/allPermissions" , permissionController.getAllPermissions);
router.post("/add" , permissionController.createNewPermission);
router.delete("/remove/:id" , permissionController.removePermission)
router.patch("/update/:id" , permissionController.updatePermissionById);


module.exports = {
    AdminApiPermissionRouter : router
}