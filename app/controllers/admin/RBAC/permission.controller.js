const createHttpError = require("http-errors");
const PermissionModel = require("../../../models/permission");
const Controller = require("../../controller");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const { addPermissionSchema } = require("../../../validators/admin/RBAC.schema");
const { copyObject, deleteInvalidPropertyInObject } = require("../../../utils/function");

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
            console.log(name,description);
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

    async removePermission(req,res,next) {
        try {
            const {id} = req.params;
            await this.findPermissionWithID(id);
            const permission = await PermissionModel.deleteOne({_id: id});
            if(!permission.deletedCount) {
                throw new createHttpError.InternalServerError("سطح دسترسی با شناسه مورد نظر حذف نشد .")
            }
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "سطح دسترسی با موفقیت حذف شد ."
                }
            })

        }
        catch(error) {
            next(error);
        }
    }

    async updatePermissionById(req,res,next) {
        try {
            const {id} = req.params;
            const permissionId = await this.findPermissionWithID(id);
            await addPermissionSchema.validateAsync(req.body);
            const data = copyObject(req.body);
            deleteInvalidPropertyInObject(data , []);
            const updatePermission = await PermissionModel.updateOne({_id: permissionId._id} , {
                $set: data
            });
            if(!updatePermission.modifiedCount) {
                throw new createHttpError.InternalServerError("سطح دسترسی مورد نظر آپدیت نشد .")
            }
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "سطح دسترسی مورد نظر با موفقیت ویرایش شد ."
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

    async findPermissionWithID(_id) {
        const permission = await PermissionModel.findById({_id});
        if(!permission) {
            throw new createHttpError.NotFound("سطح دسترسی با شناسه یافت نشد .")
        }
        return permission;
    }
}

module.exports = new PermissionController();
