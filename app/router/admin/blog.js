const { Router } = require("express");
const AdminBlogController = require("../../controllers/admin/blog.controller")

const router = Router();

/**
 * @swagger
 *  /admin/blogs:
 *      get:
 *          tags: [Blog(AdminPanel)]
 *          summary: get all Blogs
 *          responses: 
 *              200:
 *                  description: getAllBlogs successfully
 */
router.get("/" , AdminBlogController.getListOfBlogs);

module.exports = {
    BlogAdminApiRoutes : router
}