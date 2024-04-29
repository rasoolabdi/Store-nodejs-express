const { Router } = require("express");
const { AdminApiCategoryRouter } = require("./category");
const { AdminApiBlogRouter } = require("./blog");
const { AdminApiProductRouter } = require("./product");
const { AdminApiCourseRouter } = require("./course");
const { AdminApiChapterRouter } = require("./chapter");
const router = Router();

router.use("/category" , AdminApiCategoryRouter);
router.use("/blogs"    , AdminApiBlogRouter);
router.use("/products"  ,AdminApiProductRouter);
router.use("/courses" ,  AdminApiCourseRouter);
router.use("/chapter" , AdminApiChapterRouter);
 
module.exports = {
    AdminRoutes : router
}