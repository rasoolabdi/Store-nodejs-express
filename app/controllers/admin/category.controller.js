const createHttpError = require("http-errors");
const CategoryModel = require("../../models/categories");
const Controller = require("../controller");
const { addCategorySchema } = require("../../validators/admin/category.schema");



class CategoryController extends Controller {

    async addCategory(req,res,next) {
        try {
            await addCategorySchema.validateAsync(req.body);
            const {title , parent} = req.body;
            const category = await CategoryModel.create({title , parent});
            if(!category) {
                throw new createHttpError.InternalServerError("دسته بندی ایجاد نشد")
            }
            return res.status(201).json({
                data: {
                    statusCode: 201,
                    message: "دسته بندی با موفقیت ایجاد شد ."
                }
            })
        }
        catch(e) {
            next(e);
        }
    };

    removeCategory(req,res,next) {
        try {

        }
        catch(e) {
            next(e);
        }
    }

    editCategory(req,res,next) {
        try {

        }
        catch(e) {
            next(e);
        }
    }

    getAllCategory(req,res,next) {
        try {

        }
        catch(e) {
            next(e);
        }
    };

    getCategoryById(req,res,next) {
        try {

        }
        catch(e) {
            next(e);
        }
    };

    getAllParents(req,res,next) {
        try {

        }
        catch(e) {
            next(e);
        }
    };

    getChildOfParents(req,res,next) {
        try {

        }
        catch(e) {
            next(e);
        }
    };
};

module.exports = new CategoryController();