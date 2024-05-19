const createHttpError = require("http-errors");
const PermissionModel = require("../../../models/permission");
const Controller = require("../../controller");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const { addPermissionSchema } = require("../../../validators/admin/RBAC.schema");

class PermissionController extends Controller {

    async getAllPermissions(req,res,next) {
        try {
            const permissions = await PermissionModel.find({} , {__v:0 });
            if(!permissions) {
                throw new createHttpError.NotFound("هیچ سطح دسترسی ایی یافت نشد ")
            }
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    permissions
                }
            })
        }
        catch(error) {
            next(error)
        }
    }

    async createNewPermission(req,res,next) {
        try {
            const {name , description} = await addPermissionSchema.validateAsync(req.body);
            await this.findPermissionWithName(name);
            const permission = await PermissionModel.create({name , description});
            if(!permission) {
                throw new createHttpError.InternalServerError("سطح دسترسی مورد نظر ثبت نشد")
            }
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED, 
                data: {
                    message: "سطح دسترسی مورد نظر با موفقیت ثبت شد ."
                }
            })
        }
        catch(error) {
            next(error);
        }
    }

    async findPermissionWithName(name) {
        const permission = await PermissionModel.findOne({name});
        if(permission) {
            throw new createHttpError.BadRequest("سطح دسترسی مورد نظر قبلا ثبت شده است .");
        }
    }
}

module.exports = new PermissionController();
