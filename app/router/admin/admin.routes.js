const { Router } = require("express");
const { AdminApiCategoryRouter } = require("./category");
const { AdminApiBlogRouter } = require("./blog");
const { VerifyAccessToken } = require("../../middlewares/verifyAccessToken");
const { AdminApiProductRouter } = require("./product");
const { AdminApiCourseRouter } = require("./course");


const router = Router();

/**
 * @swagger
 * tags:
 *     -    name: Admin-Panel
 *          description: api's admin panel
 *     -    name: Course(AdminPanel)
 *          description: managment course section like manage episode , chapter and courses
 *     -    name: Product(AdminPanel)
 *          description: managment products route
 *     -    name: Category(AdminPanel)
 *          description: all method and routes about category section
 *     -    name: Blog(AdminPanel)
 *          description: made blog managment admin panel
 *     -    name: Prisma(Api)
 *          description: create some api's with prisma and postgreSQL category section
 */

router.use("/category" , AdminApiCategoryRouter);
router.use("/blogs"    , AdminApiBlogRouter);
router.use("/products"  ,AdminApiProductRouter);
router.use("/courses" ,  AdminApiCourseRouter);
 
module.exports = {
    AdminRoutes : router
}