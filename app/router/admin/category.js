const { Router } = require("express");
const categoryController = require("../../controllers/admin/category.controller");


const router = Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Category:
 *              type: object
 *              required: 
 *                  -   title
 *              properties:
 *                 title:
 *                      type: string
 *                      description: the title of category
 *                 parent:
 *                      type: string
 *                      description: the parent of category
 */


/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: [Category(AdminPanel)]
 *          summary: create new title and parent of category
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *          responses:
 *              201:
 *                  description: create new category successfully
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
 *          summary: edit or update category title with object id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required : true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Category'
 *          responses:
 *              200:
 *                  description: success
 */


router.patch("/update/:id" , categoryController.editCategoryTitle);


module.exports = {
    AdminApiCategoryRouter: router
}