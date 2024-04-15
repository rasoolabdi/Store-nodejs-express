const { Router } = require("express");
const { CategoryRoutes } = require("./category");


const router = Router();

/**
 * @swagger
 * tags:
 *     -    name: Admin-Panel
 *          description: api's admin panel
 *      -   name: Category(AdminPanel)
 *          description: all method and routes about category section
 */

router.use("/category" , CategoryRoutes);

module.exports = {
    AdminRoutes : router
}