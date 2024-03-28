const { Router } = require("express");
const homeController = require("../../controllers/api/home.controller");
const { VerifyAccessToken } = require("../../middlewares/verifyAccessToken");
const router = Router();


/**
 * @swagger
 * tags:
 *   name: IndexPage
 *   description: apis page main route
 */

/**
 * @swagger
 * /:
 *  get:
 *      summary: index of routes
 *      tags: [IndexPage]
 *      description: get index page
 *      parameters:
 *          -   in: header
 *              name: access-token
 *              example: Bearer yourToken
 *      responses:
 *          200:
 *              description: success
 *          404:
 *              description: not found
 *              
 */

router.get("/" , VerifyAccessToken , homeController.indexPage);

module.exports = {
    HomeRoutes : router
}