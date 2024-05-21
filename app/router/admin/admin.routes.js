const { Router } = require("express");
const { AdminApiCategoryRouter } = require("./category");
const { AdminApiBlogRouter } = require("./blog");
const { AdminApiProductRouter } = require("./product");
const { AdminApiCourseRouter } = require("./course");
const { AdminApiChapterRouter } = require("./chapter");
const { AdminApiEpisodeRouter } = require("./episode");
const { AdminApiUserRouter } = require("./user");
const { AdminApiRoleRouter } = require("./role");
const { AdminApiPermissionRouter } = require("./permission");
const { checkPermission } = require("../../middlewares/permission.guard");
const { PERMISSIONS } = require("../../utils/constant");
const router = Router();

router.use("/category"  ,checkPermission([PERMISSIONS.CONTENT_MANAGER]),AdminApiCategoryRouter);
router.use("/blogs",checkPermission([PERMISSIONS.CONTENT_MANAGER ,PERMISSIONS.CONTENT_MANAGER]),AdminApiBlogRouter);
router.use("/products",checkPermission([PERMISSIONS.SUPPLIER]),AdminApiProductRouter);
router.use("/courses", checkPermission([PERMISSIONS.TEACHER])  ,AdminApiCourseRouter);
router.use("/chapter"   ,checkPermission([PERMISSIONS.TEACHER , PERMISSIONS.CONTENT_MANAGER]) ,AdminApiChapterRouter);
router.use("/episode"   ,checkPermission([PERMISSIONS.TEACHER, PERMISSIONS.CONTENT_MANAGER]) ,AdminApiEpisodeRouter)
router.use("/user"      ,checkPermission([PERMISSIONS.USER])    ,AdminApiUserRouter);
router.use("/role"      ,checkPermission([PERMISSIONS.ALL])     ,AdminApiRoleRouter);
router.use("/permission",checkPermission([PERMISSIONS.ALL])     ,AdminApiPermissionRouter)


module.exports = {
    AdminRoutes : router
}