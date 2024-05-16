const createHttpError = require("http-errors");
const UserModel = require("../../../models/users");
const Controller = require("../../controller");
const {StatusCodes: HttpStatus} = require("http-status-codes");

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

}

module.exports = new UserController();