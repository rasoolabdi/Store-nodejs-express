const createHttpError = require("http-errors");
const CourseModel = require("../../../models/course");
const Controller = require("../../controller");
const {StatusCodes: HttpStatus} = require("http-status-codes")
const path = require("path");
const { createCourseSchema } = require("../../../validators/admin/course.schema");
const { default: mongoose } = require("mongoose");


class CourseController extends Controller {


    async addCourse(req,res,next) {
        try {
            const courseSchema = await createCourseSchema.validateAsync(req.body);
            const {fileUploadPath , filename} = courseSchema;
            const image = path.join(fileUploadPath , filename).replace(/\\/g , "/");
            const {title , short_text , text , tags , category, price , discount, type, status} = courseSchema;
            const teacher = req.user._id;
            if(Number(price) > 0 && type === "free") throw createHttpError.BadRequest("برای دوره رایگان نمیتوان قیمت ثبت کرد .");
            const createCourse = await CourseModel.create({
                title,
                short_text,
                text,
                tags,
                category,
                price,
                discount,
                type,
                image,
                time: "00:00:00",
                status,
                teacher,
            });
            console.log(createCourse);
            if(!createCourse?._id){
                throw createHttpError.InternalServerError("دوره ثبت نشد")
            }
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {
                    message: "دوره با موفقیت ایجاد گردید ."
                }
            });
        }
        catch(error) {
            next(error);
        }
    }


    async getListOfProduct(req,res,next) {
        try {
            const search = req.query?.search;
            let courses;
            if(search) {
                courses = await CourseModel.find({
                    $text: {
                        $search: search
                    }
                } , {__v: 0}).sort({_id: -1}).populate([
                    {path: "category" , select: {children: 0 , parent: 0}},
                    {path: "teacher" , select: {first_name: 1 , last_name: 1 , mobile: 1 , email: 1}}
                ]);
            }
            else{
                courses = await CourseModel.find({} , {__v: 0}).sort({_id: -1}).populate([
                    {path: "category" , select: {children: 0 , parent: 0}},
                    {path: "teacher" , select: {first_name: 1, last_name:1 , mobile: 1, email: 1}}
                ]) ;
            }
            if(!courses) {
                throw new createHttpError.NotFound("متاسفانه هیچ محصول درسی پیدا نشد .");
            }
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    courses
                }
            })
        }
        catch(error) {
            next(error);
        }
    }

    async getCourseById(req,res,next) {
        try {
            const {id} = req.params;
            const course = await CourseModel.findById(id, {__v:0});
            if(!course) {
                throw createHttpError.NotFound("دوره ایی یافت نشد")
            }
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    course
                }
            })
        }
        catch(error) {
            next(error);
        }
    }

    async findCoursesById(id) {
        try {
            if(!mongoose.isValidObjectId(id)) {
                throw createHttpError.BadRequest("شناسه ارسال شده معتبر نمی باشد .")
            }
            const courseId = await CourseModel.findById(id);
            if(!courseId) {
                throw createHttpError.NotFound("شناسه دوره یافت نشد .")
            }
            return courseId;
        }
        catch(error) {
            next(error)
        }
    }
}

module.exports = {
    AbstractCourseController: CourseController,
    courseController : new CourseController()

}