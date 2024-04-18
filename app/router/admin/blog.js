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
 *          parameters:
 *              -   name: access-token
 *                  in: header
 *                  example: Bearer token
 *                  value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTMzMTQyOTI4NCIsImlhdCI6MTcxMzQyMjY3OSwiZXhwIjoxNzEzNDI5ODc5fQ.Yy-Xrf3GYSiAX46NSIlqvzWQ-x-Z38zeDVe9vHkLL7k
 *                  type: string
 *                  required: true
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
 *              -   name: access-token
 *                  in: header
 *                  example: Bearer token
 *                  type: string
 *                  required: true
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