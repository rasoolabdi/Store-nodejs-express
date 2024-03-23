const { Router } = require("express");
const homeController = require("../../controllers/api/home.controller");
const router = Router();


/**
 * @swagger
 * tags:
 *  name: IndexPage
 * description: apis page main route
 */

/**
 * @swagger
 * /:
 *  get:
 *      summary: index of routes
 *      tags: [IndexPage]
 *      description: get index page
 *      responses:
 *          200:
 *              description: success
 *          404:
 *              description: not found
 *              
 */

router.get("/" , homeController.indexPage);

module.exports = {
    HomeRoutes : router
}