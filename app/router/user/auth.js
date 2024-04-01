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
 *  /user/get-otp:
 *      post:
 *          tags: [USER-Authentication]
 *          summary: login user in userpanel with phone number
 *          description: Get OTP for login
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


router.post("/get-otp" , userAuthController.getOtp);

/**
 * @swagger 
 *  /user/check-otp:
 *      post:
 *          tags: [USER-Authentication]
 *          summary: check-otp value in user controller
 *          description: check otp with code mobile 
 *          parameters:
 *              -   name: mobile
 *                  description: fa-IRI phoneNumber
 *                  in: formData
 *                  required: true
 *                  type: string
 *              -   name: code
 *                  description: inter sms code
 *                  in: formData
 *                  required: true
 *                  type: string
 *          responses:
 *              200:
 *                  description: checked successfully otp code
 */


router.post("/check-otp" , userAuthController.checkOtp);

/**
 * @swagger
 *  /user/refresh-token:
 *      post:
 *          tags: [USER-Authentication]
 *          summary: send refresh token
 *          description: refresh token
 *          parameters: 
 *              -   in: formData
 *                  name: refreshToken
 *                  required: true
 *                  type: string
 *          responses:
 *              200:
 *                  description: success create new refresh token
 */
router.post("/refresh-token" , userAuthController.refreshToken);

module.exports = {
    UserAuthRoutes: router
}