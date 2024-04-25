const createHttpError = require("http-errors");
const CategoryModel = require("../../models/categories");
const Controller = require("../controller");
const { addCategorySchema, updateCategorySchema } = require("../../validators/admin/category.schema");
const { default: mongoose, Types } = require("mongoose");
const {StatusCodes: HttpStatus} = require("http-status-codes");



class CategoryController extends Controller {

    async addCategory(req,res,next) {
        try {
            await addCategorySchema.validateAsync(req.body);
            const {title , parent} = req.body;
            const category = await CategoryModel.create({title , parent});
            if(!category) {
                throw new createHttpError.InternalServerError("دسته بندی ایجاد نشد")
            }
            return res.status(HttpStatus.CREATED).json({
                data: {
                    statusCode: HttpStatus.CREATED,
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
            const deleteResult = await CategoryModel.deleteMany({
                $or: [
                    {_id: category._id},
                    {parent: category._id}
                ]
            })
            if(deleteResult.deletedCount == 0) {
                throw createHttpError.InternalServerError("حذف دسته بندی انجام نشد .");
            }
            return res.status(HttpStatus.OK).json({
                data: {
                    statusCode: HttpStatus.OK,
                    message: "دسته بندی با موفقیت حذف شد ."
                }
            })
        }
        catch(e) {
            next(e);
        }
    }

    async editCategoryTitle(req,res,next) {
        try {
            const {id} = req.params;
            const {title} = req.body;
            const categories = await this.checkExistCategory(id);
            await updateCategorySchema.validateAsync(req.body);
            const resultOfUpdate = await CategoryModel.updateOne({_id: id} , { $set: {title} });
            console.log(resultOfUpdate);
            if(resultOfUpdate.modifiedCount == 0) {
                throw new createHttpError.InternalServerError("به روز رسانی انجام نشد.")
            }
            return res.status(HttpStatus.OK) .json({
                data : {
                    statusCode: HttpStatus.OK,
                    message: "به روز رسانی با موفقیت انجام شد ."
                }
            })
        }
        catch(e) {
            next(e);
        }
    }

    async getAllCategory(req,res,next) {
        try {
            // const category = await CategoryModel.aggregate([
            //     {
            //         $lookup: {
            //             from: "categories",
            //             localField: "_id",
            //             foreignField: "parent",
            //             as: "children"
            //         },
            //     },
            //     {
            //         $project: {
            //             __v: 0,
            //             "children.__v" : 0,
            //             "children.parent": 0
            //         }
            //     },
            //     {
            //         $match: {
            //             parent: undefined
            //         }
            //     }
            // ]);

            // const category = await CategoryModel.aggregate([
            //     {
            //         $graphLookup: {
            //             from: "categories",
            //             startWith : "$_id",
            //             connectFromField: "_id",
            //             connectToField: "parent",
            //             maxDepth: 5,
            //             depthField: "depth",
            //             as: "children"
            //         },
            //     },
            //     {
            //         $project: {
            //             __v: 0,
            //             "children.__v" : 0,
            //             "children.parent": 0
            //         }
            //     },
            //     {
            //         $match: {
            //             parent: undefined
            //         }
            //     }
            // ]);


            const categories = await CategoryModel.find({parent: undefined} , {__v: 0})
            return res.status(HttpStatus.OK).json({
                data: {
                    statusCode: HttpStatus.OK,
                    categories
                }
            })
        }
        catch(e) {
            next(e);
        }
    };

    async getAllCategoryWithoutPopulate(req,res,next) {
        try{
            const categories = await CategoryModel.aggregate([
                {
                    $match: {}
                }
            ]);

            return res.status(HttpStatus.OK).json({
                data : {
                    statusCode: HttpStatus.OK,
                    categories
                }
            })
        }
        catch(e) {
            next(e);
        }
    }


    async getCategoryById(req,res,next) {
        try {
            const {id: _id} = req.params;
            const category = await CategoryModel.aggregate([
                {
                    $match: { _id: new Types.ObjectId(_id) }
                },
                {
                    $lookup :{
                        from: "categories",
                        localField: "_id",
                        foreignField: "parent",
                        as: "children"
                    }
                },
                {
                  $project : {
                    __v: 0,
                    "children.__v" : 0,
                    "children.__parent" : 0
                  }  
                }
            ])
            return res.status(HttpStatus.OK).json({
                data: {
                    statusCode: HttpStatus.OK,
                    category
                }
            })
        }
        catch(e) {
            next(e);
        }
    };

    async getAllParents(req,res,next) {
        try {
            const parents = await CategoryModel.find({parent: undefined}, {__v:0});
            return res.status(HttpStatus.OK).json({
                data : {
                    statusCode: HttpStatus.OK,
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
            return res.status(HttpStatus.OK).json({
                data: {
                    statusCode: HttpStatus.OK,
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