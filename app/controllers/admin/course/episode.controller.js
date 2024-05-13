const { default: getVideoDurationInSeconds } = require("get-video-duration");
const { createEpisodeSchema } = require("../../../validators/admin/course.schema");
const Controller = require("../../controller");
const path = require("path");
const { getTime } = require("../../../utils/function");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const CourseModel = require("../../../models/course");
const createHttpError = require("http-errors");



class EpisodeController extends Controller {

    async addNewEpisode(req,res,next) {
        try {
            // const validationEpisode = await createEpisodeSchema.validateAsync(req.body);
            const {title , text , type , chapterId , courseId , filename , fileUploadPath} = await createEpisodeSchema.validateAsync(req.body);
            const videoAddress = path.join(fileUploadPath,filename).replace(/\\/g , "/");
            const videoURL = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${videoAddress}`;
            const seconds = await getVideoDurationInSeconds(videoURL);
            const time = getTime(seconds);
            console.log(req.body);
            const episod = {
                title,
                text,
                type,
                time,
                videoAddress
            }
            const createEpisodeResult = await CourseModel.updateOne({_id: courseId , "chapters._id": chapterId} , {
                $push: {
                    "chapters.$.episodes" : episod
                }
            })
            if(createEpisodeResult.modifiedCount == 0) {
                throw new createHttpError.InternalServerError("ایجاد اپیزود انجام نشد .")
            }
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data : {
                    message: "اپیزود با موفقیت ایجاد شد ."
                }
            })
        }
        catch(error) {
            next(error)
        }
    }
};

module.exports = new EpisodeController();