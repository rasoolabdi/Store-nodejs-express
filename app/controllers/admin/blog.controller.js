const createHttpError = require("http-errors");
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
            const {id} = req.params;
            const blog = await this.findBlog({_id: id});
            return res.status(200).json({
                data: {
                    statusCode:200,
                    blog
                }
            })
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
            const {id} = req.params;
            await this.findBlog(id);
            const result = await BlogModel.deleteOne({_id: id});
            if(result.deletedCount == 0) {
                throw createHttpError.InternalServerError("بلاگ حذف نشد. مجدد تلاش کنید .")
            }
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    message: "بلاگ یا مقاله با موفقیت حذف گردید ."
                }
            })
        }
        catch(e) {
            next(e);
        }
    }


    async updateBlogById(req,res,next) {
        try {
            const {id} = req.params;
            await this.findBlog(id);
            if(req?.body?.fileUploadPath && req?.body?.filename) {
                req.body.image = path.join(req.body.fileUploadPath , req.body.filename);
                req.body.image = req.body.image.replace(/\\/g, "/");
            }
            const data = req.body;
            let nullishData = ["" ," " ,'' , ' ' , 0 , "0", null , undefined];
            let blackListFields = ["bookmarks" ,"deslikes" , "comments" , "likes" , "author"];
            Object.keys(data).forEach((key) => {
                if(blackListFields.includes(key)) {
                    delete data[key];
                }
                if(typeof data[key] === "string") {
                    data[key] = data[key].trim();
                }
                if(Array.isArray(data[key] && Array.length > 0)) {
                    data[key] = data[key].map((item) => item.trim());
                }
                if(nullishData.includes(data[key])) {
                    delete data[key]
                }
            });

            const UpdateBlog = await BlogModel.updateOne({_id: id} , {$set: data});
            if(UpdateBlog.modifiedCount == 0) {
                throw createHttpError.InternalServerError("آپدیت انجام نشد")
            }
            return res.status(200).json({
                data: {
                    statusCode: 200,
                    message: "آپدیت بلاگ با موفقیت انجام شد ."
                }
            })
        }
        catch(e) {
            deleteFileInPublic(req?.body?.image);
            next(e);
        }
    }

    async findBlog(id) {
        // const path = await BlogModel.findOne(query).getPopulatedPaths();
        // console.log(path);
        const blog = await BlogModel.findById(id).populate([{path: "category", select: {title: 1}} , {path: "author" , select: ['mobile' , 'first_name' , 'last_name' , 'username']}]);
        if(!blog) {
            throw createHttpError.NotFound("بلاگ یا مقاله ایی با این مشخصات یافت نشد .")
        }
        delete blog.category.children;
        return blog;
    }
}

module.exports = new AdminBlogController();