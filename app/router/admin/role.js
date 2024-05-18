const { Router } = require("express");
const roleController = require("../../controllers/admin/RBAC/role.controller");


const router = Router();

router.post("/add" , roleController.createNewRole);
router.get("/allRoles" , roleController.getAllRoles);

module.exports = {
    AdminApiRoleRouter : router

}