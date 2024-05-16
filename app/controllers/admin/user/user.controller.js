const createHttpError = require("http-errors");
const UserModel = require("../../../models/users");
const Controller = require("../../controller");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const { deleteInvalidPropertyInObject } = require("../../../utils/function");

class UserController extends Controller {

    async getAllUsers(req,res,next) {
        try {
            const search = req?.query?.search || "";
            // const databaseQuery = {};    //method 1 - index search
            // if(search) databaseQuery[$text] = {$search: search}
            let users;
            if(search) {  //method 2 - index search
                users = await UserModel.find({
                    $text : {
                        $search: new RegExp(search , "ig")
                    }
                });
                if(!users) {
                    throw new createHttpError.NotFound("هیچ کاربری یافت نشد .")
                }
            }
            else {
                users = await UserModel.find({} , {__v:0});
                if(!users) {
                    throw new createHttpError.NotFound("کاربری پیدا نشد")
                }
            }
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data : {
                    users
                }
            })
        }
        catch(error) {
            next(error);
        }
    }

    async updateUserProfile(req,res,next) {
        try {
            const userId = req.user._id;
            const data = req.body
            const blackListFields = ["Courses" , "mobile" , "otp" , "bills" , "discount" , "roles"];
            deleteInvalidPropertyInObject(data , blackListFields);
            const profileUpdateResult = await UserModel.updateOne({_id: userId} , {
                $set: data
            });
            if(!profileUpdateResult.modifiedCount) {
                throw new createHttpError.InternalServerError("به روز رسانی پروفایل انجام نشد .")
            }
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "به روز رسانی پروفایل با موفقیت انجام شد ."
                }
            })
        }
        catch(error) {
            next(error);
        }
    }
}

module.exports = new UserController();