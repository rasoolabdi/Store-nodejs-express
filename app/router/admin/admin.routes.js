const { Router } = require("express");
const { AdminApiCategoryRouter } = require("./category");
const { AdminApiBlogRouter } = require("./blog");
const { AdminApiProductRouter } = require("./product");
const { AdminApiCourseRouter } = require("./course");
const { AdminApiChapterRouter } = require("./chapter");
const { AdminApiEpisodeRouter } = require("./episode");
const router = Router();

router.use("/category" , AdminApiCategoryRouter);
router.use("/blogs"    , AdminApiBlogRouter);
router.use("/products"  ,AdminApiProductRouter);
router.use("/courses" ,  AdminApiCourseRouter);
router.use("/chapter" , AdminApiChapterRouter);
router.use("/episode" , AdminApiEpisodeRouter)
 
module.exports = {
    AdminRoutes : router
}