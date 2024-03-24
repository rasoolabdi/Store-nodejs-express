const { Router } = require("express");
const userAuthController = require("./../../controllers/user/auth/auth.controller")
const router = Router();


/**
 * @swagger
 *  tags:
 *      name:   USER-Authentication
 *      description: user-auth
 */

/**
 * @swagger
 *  /user/login:
 *      post:
 *          tags: [USER-Authentication]
 *          summary: login user in userpanel with phone number
 *          description: OTP login
 *          parameters: 
 *              -   name: mobile
 *                  description: fa-IRI phoneNumber
 *                  in: formData
 *                  required: true
 *                  type: string
 *          responses:
 *              201:
 *                  description: login successfully
 *              400:
 *                  description: bad request
 *              401:
 *                  description: unauthorization
 *              500:
 *                  description: internal server Error
 */


router.post("/login" , userAuthController.login);


module.exports = {
    UserAuthRoutes: router
}