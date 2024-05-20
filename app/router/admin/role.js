const { Router } = require("express");
const roleController = require("../../controllers/admin/RBAC/role.controller");
const { stringToArray } = require("../../middlewares/stringToArray");


const router = Router();

router.post("/add" , stringToArray("permissions")  ,roleController.createNewRole);
router.get("/allRoles"  ,roleController.getAllRoles);
router.delete("/remove/:field" , roleController.removeRole);
router.patch("/update/:id" , stringToArray("permissions") , roleController.updateRoleById)

module.exports = {
    AdminApiRoleRouter : router

}