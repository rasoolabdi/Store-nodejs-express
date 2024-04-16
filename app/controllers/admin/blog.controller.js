const { createBlogSchema } = require("../../validators/admin/blog.schema");
const Controller = require("../controller");


class AdminBlogController extends Controller {

    async createBlog(req,res,next) {
        try {
            const blogDataBody = await createBlogSchema.validateAsync(req.body);
            return res.json(blogDataBody)
        }
        catch(e) {
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