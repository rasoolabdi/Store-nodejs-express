const { Router } = require("express");
const AdminBlogController = require("../../controllers/admin/blog.controller");
const { uploadFile } = require("../../utils/multer");
const { stringToArray } = require("../../middlewares/stringToArray");

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

/**
 * @swagger 
 *  /admin/blogs/add:
 *      post:
 *          tags: [Blog(AdminPanel)]
 *          summary: create Blog documents
 *          consumes:
 *              -   multipart/form-data
 *          parameters: 
 *              -   name: title
 *                  in: formData
 *                  required: true
 *                  type: string
 *              -   name: text
 *                  in: formData
 *                  required: true
 *                  type: string
 *              -   name: short_text
 *                  in: formData
 *                  required: true
 *                  type: string
 *              -   name: tags
 *                  example: tag1#tag2#tag3_foo#foo_bar || string || undefined
 *                  in: formData
 *                  type: string
 *              -   name: category
 *                  in: formData
 *                  required: true
 *                  type: string
 *              -   name: image
 *                  in: formData
 *                  required: true
 *                  type: file
 *          responses: 
 *              201:
 *                  description: create blog successfully
 */

router.post("/add" , uploadFile.single("image"), stringToArray("tags") ,AdminBlogController.createBlog);

module.exports = {
    BlogAdminApiRoutes : router
}