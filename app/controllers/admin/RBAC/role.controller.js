const createHttpError = require("http-errors");
const RoleModel = require("../../../models/role");
const Controller = require("../../controller");
const {StatusCodes: HttpStatus} = require("http-status-codes");
const { addRoleSchema } = require("../../../validators/admin/RBAC.schema");

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
            const roles = await RoleModel.find({}).populate([{path: "permission"}]);
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


    async findRoleWithTitle(title) {
        const role = await RoleModel.findOne({title});
        if(!role) {
            throw new createHttpError.BadRequest(" نقش یا رول مورد نظر قبلا ثبت شده است .")
        }
        // return role;
    }
}

module.exports = new RoleController();
