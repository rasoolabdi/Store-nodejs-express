const createHttpError = require("http-errors");
const CourseModel = require("../../../models/course");
const Controller = require("../../controller");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const {AbstractCourseController} = require("./course.controller");
const courseController = require("./course.controller");



class ChapterController extends AbstractCourseController {

    async addChapter(req,res,next) {
        try {
            const {id,title , text} = req.body;
            await this.findCoursesById(id);
            const saveChapterResult = await CourseModel.updateOne({_id: id} , {
                $push: {
                    chapters: {title , text , episodes: []}
                }
            })
            if(saveChapterResult.modifiedCount == 0) {
                throw createHttpError.InternalServerError("فصل مورد نظر برای دوره افزوده نشد .")
            }
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {
                    message: "قصل مورد نظر به دوره با موفقیت افزوده شد ."
                }
            })
        }
        catch(error) {
            next(error)
        }
    }

   

    async chaptersOfCourse(req,res,next) {
        try {
            const {courseId} = req.params;
            // await this.findCoursesById(id); //when use AbstractCourseController
            // await courseController.findCoursesById(id); when get id from function findCourseById from course controller
            const course = await this.getChaptersOfCourse(courseId);
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data : {
                    course
                }                
            })
        }
        catch(error) {
            next(error);
        }
    }

    async getChaptersOfCourse (id) {
        const chapters = await CourseModel.find({_id: id} , {chapters: 1 , title: 1});
        if(!chapters) {
            throw createHttpError.NotFound("فصل های درس مورد نظر یافت نشد .")
        }
        return chapters;
    }
}

module.exports = new ChapterController();