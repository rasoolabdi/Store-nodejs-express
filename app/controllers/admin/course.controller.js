const createHttpError = require("http-errors");
const CourseModel = require("../../models/course");
const Controller = require("../controller");
const {StatusCodes: HttpStatus} = require("http-status-codes")
const path = require("path");
const { createCourseSchema } = require("../../validators/admin/course.schema");


class CourseController extends Controller {


    async addCourse(req,res,next) {
        try {
            const courseSchema = await createCourseSchema.validateAsync(req.body);
            const {fileUploadPath , filename} = courseSchema;
            const image = path.join(fileUploadPath , filename).replace(/\\/g , "/");
            const {title , short_text , text , tags , category, price , discount} = courseSchema;
            const teacher = req.user._id;
            const createCourse = await CourseModel.create({
                title,
                short_text,
                text,
                tags,
                category,
                price,
                discount,
                image,
                time: "00:00:00",
                status: "notStarted",
                teacher,

            });
            console.log(createCourse);
            if(!createCourse?._id){
                throw createHttpError.InternalServerError("دوره ثبت نشد")
            }
            return res.status(HttpStatus.CREATED).json({
                data: {
                    statusCode: HttpStatus.CREATED,
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
                } , {__v: 0}).sort({_id: -1});
            }
            else{
                courses = await CourseModel.find({} , {__v: 0}).sort({_id: -1}) ;
            }
            if(!courses) {
                throw new createHttpError.NotFound("متاسفانه هیچ محصول درسی پیدا نشد .");
            }
            return res.status(HttpStatus.OK).json({
                data: {
                    statusCode: HttpStatus.OK,
                    courses
                }
            })
        }
        catch(error) {
            next(error);
        }
    }


   


}

module.exports = new CourseController();