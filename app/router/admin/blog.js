const { Router } = require("express");
const AdminBlogController = require("../../controllers/admin/blog.controller");
const { uploadFile } = require("../../utils/multer");
const { stringToArray } = require("../../middlewares/stringToArray");

const router = Router();

/**
 * @swagger
 *  components:
 *      schemas:
 *          Blog:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   image
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of blog
 *                  short_text:
 *                      type: string
 *                      description: the short_text of text of blog
 *                  text:
 *                      type: string
 *                      description: the text of blog
 *                  tags:
 *                      type: string
 *                      description: the list of tags for example  tags1#tags2#tags-foo
 *                  category:
 *                      type: string
 *                      description: the id of category of blog
 *                  image:
 *                      type: file
 *                      description: the image of blog
 *             
 */


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
 *          requestBody:
 *              required: true
 *              content:
 *                 multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Blog'
 *          responses: 
 *              201:
 *                  description: create blog successfully
 */

router.post("/add" , uploadFile.single("image"), stringToArray("tags") ,AdminBlogController.createBlog);


/**
 * @swagger 
 *  /admin/blogs/update/{id}:
 *      patch:
 *          tags: [Blog(AdminPanel)]
 *          summary: update Blog By Id documents
 *          consumes:
 *              -   multipart/form-data
 *          parameters: 
 *              -   name: id
 *                  in: path
 *                  type: string
 *                  required: true
 *              -   name: title
 *                  in: formData
 *                  type: string
 *              -   name: text
 *                  in: formData
 *                  type: string
 *              -   name: short_text
 *                  in: formData
 *                  type: string
 *              -   name: tags
 *                  example: tag1#tag2#tag3_foo#foo_bar || string || undefined
 *                  in: formData
 *                  type: string
 *              -   name: category
 *                  in: formData
 *                  type: string
 *              -   name: image
 *                  in: formData
 *                  type: file
 *          responses: 
 *              201:
 *                  description: update blog ById successfully
 */

router.patch("/update/:id" , uploadFile.single("image"), stringToArray("tags") ,AdminBlogController.updateBlogById);



/**
 * @swagger
 *  /admin/blogs/{id}:
 *      get:
 *          tags: [Blog(AdminPanel)]
 *          summary: get one blog by id and populate this field
 *          parameters: 
 *              -   name: id
 *                  in: path
 *                  required: true
 *                  type: string
 *          responses: 
 *              200:
 *                  description: get one blog by id successfully 
 *
 */
router.get("/:id" , AdminBlogController.getOneBlogById);

/**
 * @swagger
 *  /admin/blogs/{id}:
 *      delete:
 *          tags: [Blog(AdminPanel)]
 *          summary: delete blog by id
 *          parameters: 
 *              -   name: id
 *                  in: path
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: delete blog byId successfully
 */


router.delete("/:id" , AdminBlogController.deleteBlogById);

module.exports = {
    BlogAdminApiRoutes : router
}