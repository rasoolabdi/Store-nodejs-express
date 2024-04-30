const { Router } = require("express");
const chapterController = require("../../controllers/admin/course/chapter.controller");
const router = Router();


router.put("/add-chapter" , chapterController.addChapter);
router.get("/list/:courseId" , chapterController.chaptersOfCourse);

module.exports= {
    AdminApiChapterRouter : router
}