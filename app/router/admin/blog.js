const { Router } = require("express");
const AdminBlogController = require("../../controllers/admin/blog.controller");
const { uploadFile } = require("../../utils/multer");
const { stringToArray } = require("../../middlewares/stringToArray");

const router = Router();

router.get("/" , AdminBlogController.getListOfBlogs);
router.post("/add" , uploadFile.single("image"), stringToArray("tags") ,AdminBlogController.createBlog);
router.patch("/update/:id" , uploadFile.single("image"), stringToArray("tags") ,AdminBlogController.updateBlogById);
router.get("/:id" , AdminBlogController.getOneBlogById);
router.delete("/:id" , AdminBlogController.deleteBlogById);

module.exports = {
    AdminApiBlogRouter : router
}