const { Router } = require("express");
const categoryController = require("../../controllers/admin/category.controller");


const router = Router();


/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: [Admin-Panel]
 *          summary: create new title and parent of category
 *          parameters:
 *              -   name: title
 *                  in: formData
 *                  required: true
 *                  type: string
 *              -   name: parent
 *                  in: formData
 *                  required: false
 *                  type: string
 * 
 *          responses: 
 *              201:
 *                  description: create title and parent successfully
 */

router.post("/add" , categoryController.addCategory);

module.exports = {
    CategoryRoutes: router
}