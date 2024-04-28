const { Router } = require("express");
const categoryController = require("../../controllers/admin/category.controller");
const router = Router();

router.post("/add" , categoryController.addCategory);
router.get("/parents" , categoryController.getAllParents);
router.get("/children/:parent" , categoryController.getChildOfParents);
router.get("/allCategories" , categoryController.getAllCategory);
router.delete("/remove/:id" , categoryController.removeCategory);
router.get("/list-of-all" , categoryController.getAllCategoryWithoutPopulate);
router.get("/:id" , categoryController.getCategoryById);
router.patch("/update/:id" , categoryController.editCategoryTitle);


module.exports = {
    AdminApiCategoryRouter: router
}