const { Router } = require("express");
const { CategoryRoutes } = require("./category");
const { BlogAdminApiRoutes } = require("./blog");


const router = Router();

/**
 * @swagger
 * tags:
 *     -    name: Admin-Panel
 *          description: api's admin panel
 *     -    name: Category(AdminPanel)
 *          description: all method and routes about category section
 *     -    name: Prisma(Api)
 *          description: create some api's with prisma and postgreSQL category section
 *     -    name: Blog(AdminPanel)
 *          description: made blog managment admin panel
 */

router.use("/category" , CategoryRoutes);
router.use("/blogs" , BlogAdminApiRoutes)

module.exports = {
    AdminRoutes : router
}