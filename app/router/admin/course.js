const { Router } = require("express");
const {courseController} = require("../../controllers/admin/course/course.controller");
const { uploadFile } = require("../../utils/multer");
const { stringToArray } = require("../../middlewares/stringToArray");
const router = Router();

router.post("/add" ,uploadFile.single("image") , stringToArray("tags") ,courseController.addCourse);
router.get("/allCourses" , courseController.getListOfProduct);
router.get("/:id" , courseController.getCourseById);

module.exports = {
    AdminApiCourseRouter: router

}