const { Router } = require("express");
const categoryController = require("../../controllers/admin/category.controller");


const router = Router();


/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: [Category(AdminPanel)]
 *          summary: create new title and parent of category
 *          parameters:
 *              -   name: access-token
 *                  in: header
 *                  example: Bearer token
 *                  type: string
 *                  required: true
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
 *          tags: [Category(AdminPanel)]
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
 *          tags: [Category(AdminPanel)]
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
 *          tags: [Category(AdminPanel)]
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
 *          tags: [Category(AdminPanel)]
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

/**
 * @swagger
 *  /admin/category/list-of-all:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summary: get list all categories without populate and nested structure
 *          responses:
 *              200:
 *                  description: get list
 */

router.get("/list-of-all" , categoryController.getAllCategoryWithoutPopulate);



/**
 * @swagger
 *  /admin/category/{id}:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summary: get category by id
 *          parameters: 
 *              -   name: id
 *                  in: path
 *                  required: true,
 *                  type: string
 *          responses: 
 *              200:
 *                  description: getCategory By Id successfully
 */

router.get("/:id" , categoryController.getCategoryById);

/**
 * @swagger
 *  /admin/category/update/{id}:
 *      patch:
 *          tags: [Category(AdminPanel)]
 *          summary: edit or update category title by id
 *          parameters:
 *              -   name: id
 *                  in: path
 *                  required: true
 *                  type: string
 *              -   name: title
 *                  in: formData
 *                  type: string
 *                  required: true
 *          responses: 
 *              200:
 *                  description: update title category successfully
 *              500:
 *                  description: Internal Server Error
 * 
 */


router.patch("/update/:id" , categoryController.editCategoryTitle);


module.exports = {
    CategoryRoutes: router
}