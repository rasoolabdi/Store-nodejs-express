const { Router } = require("express");
const productController = require("../../controllers/admin/product/product.controller");
const { uploadFile } = require("../../utils/multer");
const { stringToArray } = require("../../middlewares/stringToArray");
const router = Router();

router.post("/add" ,uploadFile.array("images" , 10) , stringToArray("tags","colors"), productController.addProduct);
router.patch("/edit/:id" , uploadFile.array("images" , 10) , stringToArray("tags" , "colors") ,productController.editProduct);
router.get("/allProducts" ,productController.getAllProducts);
router.get("/:id" , productController.getOneProduct);
router.delete("/remove/:id" , productController.removeProductById);

module.exports = {
    AdminApiProductRouter: router
}