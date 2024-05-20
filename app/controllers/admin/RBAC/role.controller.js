const createHttpError = require("http-errors");
const RoleModel = require("../../../models/role");
const Controller = require("../../controller");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const { addRoleSchema } = require("../../../validators/admin/RBAC.schema");
const { default: mongoose } = require("mongoose");
const { copyObject, deleteInvalidPropertyInObject } = require("../../../utils/function");

class RoleController extends Controller {

    async createNewRole(req,res,next) {
        try {
            const {title , permissions} = await addRoleSchema.validateAsync(req.body);
            await this.findRoleWithTitle(title);
            const role = await RoleModel.create({title , permissions})
            if(!role) {
                throw new createHttpError.InternalServerError("نقش مورد نظر ایجاد نشد .")
            }
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {
                    message: "نقش مورد نظر با موفقیت ایجاد شد ."
                }
            })
        }
        catch(error) {
            next(error);
        }
    }


    async getAllRoles(req,res,next) {
        try {
            const roles = await RoleModel.find({});
            if(!roles) {
                throw new createHttpError.NotFound("هیچ رولی یافت نشد .")
            }
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    roles
                }
            })
        }
        catch(error) {
            next(error);
        }
    }

    async removeRole(req,res,next) {
        try {
            const {field} = req.params;
            const role = await this.findRoleWithIdOrTitle(field);
            const removeRoleResult = await RoleModel.deleteOne({_id: role._id});
            if(!removeRoleResult.deletedCount) {
                throw new createHttpError.InternalServerError("نقش مورد نظر حذف نشد .")
            }
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "نقش مورد نظر با موفقیت حذف شد ."
                }
            })
        }
        catch(error) {
            next(error);
        }
    }

    async updateRoleById(req,res,next) {
        try {
            const {id} = req.params;
            const roleId = await this.findRoleWithIdOrTitle(id);
            await addRoleSchema.validateAsync(req.body);
            const data = copyObject(req.body);
            deleteInvalidPropertyInObject(data , []);
            const updateRole = await RoleModel.updateOne({_id: roleId._id} , {
                $set: data
            })
            if(!updateRole.modifiedCount) {
                throw new createHttpError.InternalServerError("ویرایش نقش مورد نظر انجام نشد .")
            }
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    message: "ویرایش نقش مورد نظر با موفقیت انجام شد ."
                }
            })
        }
        catch(error) {
            next(error);
        }
    }

    async findRoleWithIdOrTitle(field) {
        let findQuery;

        //method 2
        // let findQuery = mongoose.isValidObjectId(field) ? {_id: field} : {title: field} ; //ternery operator

        //method 1 write query
        if(mongoose.isValidObjectId(field)) {
            findQuery = {_id: field}
        }
        else {
            findQuery = {title: field}
        }
        const role = await RoleModel.findOne(findQuery);
        console.log(role)
        if(!role) {
            throw new createHttpError.NotFound("نقش مورد نظر یافت نشد .")
        }
        return role;
    }


    async findRoleWithTitle(title) {
        const role = await RoleModel.findOne({title});
        if(role) {
            throw new createHttpError.BadRequest(" نقش یا رول مورد نظر قبلا ثبت شده است .")
        }
    }
}

module.exports = new RoleController();
