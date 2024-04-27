const { Router } = require("express");
const courseController = require("../../controllers/admin/course.controller");


const router = Router();




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


module.exports = {
    AdminApiCourseRouter: router

}