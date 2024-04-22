const { Router } = require("express");
const productController = require("../../controllers/admin/product.controller");
const { uploadFile } = require("../../utils/multer");
const { stringToArray } = require("../../middlewares/stringToArray");
const router = Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text    
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   count
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of product
 *                  short_text:
 *                      type: string
 *                      description: the short_text of product
 *                  text:
 *                      type: string
 *                      description: the text of product
 *                  tags:
 *                      type: array
 *                      description: the tags of product
 *                  category:
 *                      type: string
 *                      description: the category of product
 *                  price:
 *                      type: string
 *                      description: the price of product
 *                  discount:
 *                      type: string
 *                      description: the discount of product
 *                  count:
 *                      type: string
 *                      description: the count of product
 *                  image:
 *                      type: file
 *                      description: the image of product
 *                  
 */

/**
 * @swagger
 *  /admin/products/add:
 *      post:
 *          tags: [Product(AdminPanel)]
 *          summary: create and save products
 *          requestBody:
 *              required: true
 *              content: 
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          responses:
 *              201:
 *                  description: createProduct successfully
 */
router.post("/add" ,uploadFile.single("image") , stringToArray("tags"), productController.addProduct);
// router.patch();
// router.delete();
// router.get();
// router.get();

module.exports = {
    AdminApiProductRouter: router
}