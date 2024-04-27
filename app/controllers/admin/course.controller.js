const createHttpError = require("http-errors");
const CourseModel = require("../../models/course");
const Controller = require("../controller");
const {StatusCodes: HttpStatus} = require("http-status-codes")

class CourseController extends Controller {


    async addCourses(req,res,next) {
        try {

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