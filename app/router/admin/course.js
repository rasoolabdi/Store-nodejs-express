const { Router } = require("express");
const courseController = require("../../controllers/admin/course.controller");
const { uploadFile } = require("../../utils/multer");
const { stringToArray } = require("../../middlewares/stringToArray");
const router = Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Types:
 *               type: string
 *               enum:
 *                  -   free
 *                  -   cash
 *                  -   special
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          InsertCourse:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text    
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   image
 *                  -   type
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of course
 *                      example: عنوان دوره
 *                  short_text:
 *                      type: string
 *                      description: the short_text of course
 *                      example: متن کوتاه از دوره
 *                  text:
 *                      type: string
 *                      description: the text of course
 *                      example: توضیحات کامل دوره
 *                  tags:
 *                      type: array
 *                      description: the tags of course
 *                  category:
 *                      type: string
 *                      description: the category of course
 *                      example: 6628fd025e7b8e186ca409a4
 *                  price:
 *                      type: string
 *                      description: the price of course
 *                      example: قیمت دوره
 *                  discount:
 *                      type: string
 *                      description: the discount of course
 *                      example: تخفیف دوره
 *                  type: 
 *                      $ref: '#/components/schemas/Types'
 *                  image:
 *                      type: string
 *                      format: binary
 *                      description: the image of course
 *                  
 */


/**
 * @swagger
 *  /admin/courses/add:
 *      post:
 *          tags: [Course(AdminPanel)]
 *          summary: add one new course
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/InsertCourse'
 *          responses:
 *              201:
 *                  description: create new course successfully 
 */



router.post("/add" ,uploadFile.single("image") , stringToArray("tags") ,courseController.addCourse);



/**
 * @swagger
 *  /admin/courses/allCourses:
 *      get:
 *         tags: [Course(AdminPanel)]
 *         summary: get all courses
 *         parameters:
 *              -   name: search
 *                  in: query
 *                  type: string
 *                  description: ssearch in courses title , short_text , text
 *         responses:
 *              200:
 *                  description: getAllCourses successfully
 */

router.get("/allCourses" , courseController.getListOfProduct);

/**
 * @swagger
 *  /admin/courses/{id}:
 *      get:
 *          tags: [Course(AdminPanel)]
 *          summary: get one course by id
 *          parameters: 
 *              -   name: id
 *                  in: path
 *                  required: true
 *                  type: string
 *          responses:
 *              200:
 *                  description: getCourseById successfully
 */

router.get("/:id" , courseController.getCourseById);


module.exports = {
    AdminApiCourseRouter: router

}