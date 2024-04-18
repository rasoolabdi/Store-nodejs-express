const BlogModel = require("../../models/blogs");
const { deleteFileInPublic } = require("../../utils/function");
const { createBlogSchema } = require("../../validators/admin/blog.schema");
const Controller = require("../controller");
const path = require("path");


class AdminBlogController extends Controller {

    async createBlog(req,res,next) {
        try {
            const blogDataBody = await createBlogSchema.validateAsync(req.body);
            req.body.image = path.join(blogDataBody.fileUploadPath , blogDataBody.filename);
            req.body.image = req.body.image.replace(/\\/g, "/");
            const {title, short_text,text , category , tags} = blogDataBody;
            const image = req.body.image;
            // console.log(path.join(__dirname , image));
            // console.log(image);
            const author = req.user._id;
            await BlogModel.create({
                title,
                text,
                short_text,
                tags,
                image,
                category,
                author
            });
            return res.status(201).json({
                data: {
                   statusCode: 201,
                     message: "بلاگ با موفقیت ایجاد گردید ."
               }
            });
        }
        catch(e) {
            deleteFileInPublic(req.body.image);
            next(e);
        }
    }

    
    async getOneBlogById(req,res,next) {
        try {

        }
        catch(e) {
            next(e);
        }
    }


    async getListOfBlogs(req,res,next) {
        try {
            const blogs = await BlogModel.aggregate([
                {
                    $match: {

                    }
                },
                {
                    $lookup: {
                        from: "users",
                        foreignField: "_id",
                        localField: "author",
                        as: "author"
                    }
                },
                {
                    $unwind: "$author"
                },
                {
                    $project : {
                        "author.__v" :0,
                        "author.bills": 0,
                        "author.discount": 0,
                        "author.otp": 0,
                        "author.roles": 0,
                    }
                },
                {
                    $lookup: {
                        from: "categories",
                        foreignField: "_id",
                        localField: "category",
                        as: "category"
                    }
                },
                {
                    $unwind: "$category"
                },
                {
                    $project: {
                        "category.__v": 0
                    }
                }
            ]);
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    blogs
                }
            })
        }
        catch(e) {
            next(e);
        }
    }


    async getCommentsOfBlog(req,res,next) {
        try {

        }
        catch(e) {
            next(e);
        }
    }


    async deleteBlogById(req,res,next) {
        try {

        }
        catch(e) {
            next(e);
        }
    }


    async updateBlogById(req,res,next) {
        try {

        }
        catch(e) {
            next(e);
        }
    }
}

module.exports = new AdminBlogController();