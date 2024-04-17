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
            const {title, short_text , category , tags} = blogDataBody;
            const image = req.body.image;
            // console.log(path.join(__dirname , image));
            // console.log(image);
            const blog = await BlogModel.create({
                title,
                short_text,
                tags,
                image,
                category
            });
            return res.json({blogDataBody , image: req.body.image});
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
            return res.status(200).json({
                statusCode: 200,
                data: {
                    blogs: ["sla"]
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