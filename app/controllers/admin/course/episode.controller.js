const { getVideoDurationInSeconds } = require("get-video-duration");
const { createEpisodeSchema } = require("../../../validators/admin/course.schema");
const Controller = require("../../controller");
const path = require("path");
const { getTime, deleteFileInPublic, deleteInvalidPropertyInObject } = require("../../../utils/function");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const CourseModel = require("../../../models/course");
const createHttpError = require("http-errors");
const secondFormater = require("seconds-formater");
const { isValidObjectId } = require("mongoose");



class EpisodeController extends Controller {

    async addNewEpisode(req,res,next) {
        try {
            const validationEpisode = await createEpisodeSchema.validateAsync(req.body);
            const {title , text , type , chapterId , courseId , filename , fileUploadPath} = validationEpisode;
            const videoAddress = path.join(fileUploadPath,filename).replace(/\\/g , "/");
            const videoURL = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${videoAddress}`;
            const seconds = await getVideoDurationInSeconds(videoURL);
            const time = getTime(seconds);
            // const time = secondFormater.convert(seconds).format();
            console.log(time);
            console.log(seconds);
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

    async removeEpisodeById(req,res,next) {
        try {
            const {id: episodeId} = await isValidObjectId.validateAsync({id: req.params.episodeId});
            const removeEpisodeResult = await CourseModel.updateOne({
                "chapters.episodes._id" : episodeId,
            } , {
                $pull: {
                    "chapters.$.episodes": {
                        _id: episodeId
                    }
                }
            })
            if(removeEpisodeResult.modifiedCount == 0) {
                throw new createHttpError.InternalServerError("حذف اپیزود انجام نشد")
            }
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "حذف اپیزود با موفقیت انجام شد ."
                }
            })
        }
        catch(e) {
            next(e);
        }
    }

    async updateEpisode(req,res,next) {
        try {
            const {id: episodeId} = await isValidObjectId.validateAsync({id: req.params.episodeId});
            // const episodeId = req.body.id;
            const {fileUploadPath , filename} = req.body;
            let blackListFields = ["_id"];
            if(filename && fileUploadPath) {
                const fileAddress = path.join(fileUploadPath,filename);
                req.body.videoAddress = fileAddress.replace(/\\/g , "/");
                const videoURL = `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${videoAddress}`;
                const seconds = await getVideoDurationInSeconds(videoURL);
                req.body.time = getTime(seconds);
            }
            else {
                blackListFields.push("videoAddress");
                blackListFields.push("time");
            }
            const data = req.body;
            deleteInvalidPropertyInObject(data , blackListFields);
            const editEpisodeResult = await CourseModel.updateOne({
                "chapters.episodes._id" : episodeId
            }, {
                $set: {
                    "chapters.$.episodes" : data
                }
            })
            if(editEpisodeResult.modifiedCount == 0) {
                throw new createHttpError.InternalServerError("ویرایش اپیزود انجام نشد .")
            }
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "ویرایش اپیزود با موفقیت انجام شد ."
                }
            })
        }
        catch(error) {
            next(error);
        }
    }


};

module.exports = new EpisodeController();