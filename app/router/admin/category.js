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

/**
 * @swagger
 *  /admin/category/parents:
 *      get:
 *          tags: [Admin-Panel]
 *          summary: get All Parents of Category or Category Heads
 *          responses: 
 *              200:
 *                  description: get parents successfully
 */
router.get("/parents" , categoryController.getAllParents);

/**
 * @swagger
 *  /admin/category/children/{parent}:
 *      get:
 *          tags: [Admin-Panel]
 *          summary: get All children of parents category
 *          parameters: 
 *              -   name: parent
 *                  in: path
 *                  required: true
 *                  type: string
 *          responses: 
 *              200:
 *                 description: get children of category successfully
 */

router.get("/children/:parent" , categoryController.getChildOfParents);

/**
 * @swagger
 *  /admin/category/allCategories:
 *      get:
 *          tags: [Admin-Panel]
 *          summary: get All Categories
 *          responses:
 *              200:
 *                  description: Get All Categories successfully
 */
router.get("/allCategories" , categoryController.getAllCategory);

/**
 * @swagger
 *  /admin/category/remove/{id}:
 *      delete:
 *          tags: [Admin-Panel]
 *          summary: remove Category by ObjectId
 *          parameters: 
 *              -   name: id
 *                  in: path
 *                  type: string
 *                  required: true
 *                  
 *          responses: 
 *              200:
 *                  description: remove category successfully
 */

router.delete("/remove/:id" , categoryController.removeCategory);

module.exports = {
    CategoryRoutes: router
}