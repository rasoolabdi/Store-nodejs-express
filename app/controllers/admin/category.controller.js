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

    async removeCategory(req,res,next) {
        try {
            const {id} = req.params;
            const category = await this.checkExistCategory(id);
            const deleteResult = await CategoryModel.deleteOne({_id: category._id});
            if(deleteResult.deletedCount == 0) {
                throw createHttpError.InternalServerError("حذف دسته بندی انجام نشد .");
            }
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    message: "دسته بندی با موفقیت حذف شد ."
                }
            })
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

    async getAllCategory(req,res,next) {
        try {
            const category = await CategoryModel.aggregate([
                {
                    $lookup: {
                        from: "categories",
                        localField: "_id",
                        foreignField: "parent",
                        as: "children"
                    },
                },
                {
                    $project: {
                        __v: 0,
                        "children.__v" : 0,
                        "children.parent": 0
                    }
                }
            ]);
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    category
                }
            })
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

    async getAllParents(req,res,next) {
        try {
            const parents = await CategoryModel.find({parent: undefined}, {__v:0});
            return res.status(200).json({
                data : {
                    statusCode: 200,
                    parents
                }
            })
        }
        catch(e) {
            next(e);
        }
    };

    async getChildOfParents(req,res,next) {
        try {
            const {parent} = req.params;
            console.log(req.params);
            const children = await CategoryModel.find({parent} , {__v:0});
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    children
                }
            })

        }
        catch(e) {
            next(e);
        }
    };

    async checkExistCategory(id) {
        const category = await CategoryModel.findById(id);
        if(!category) {
            throw createHttpError.NotFound("دسته بندی یافت نشد")
        };
        return category;

    }
};

module.exports = new CategoryController();