const { Router } = require("express");
const userAuthController = require("./../../controllers/user/auth/auth.controller")
const router = Router();

/**
 * @swagger 
 *  components:
 *      schemas:
 *          GetOTP:
 *              type: object
 *              required: 
 *                  -   mobile
 *              properties:
 *                  mobile: 
 *                      type: string
 *                      description: the user mobile for signup/signin
 *          CheckOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *                  -   code
 *              properties:
 *                  mobile: 
 *                      type: string
 *                      description: the user mobile for signup/signin
 *                  code:
 *                      type: integer
 *                      description: recived code from getOTP           
 *          RefreshToken:
 *              type: object
 *              required:
 *                  -   refreshToken
 *              properties:
 *                  refreshToken:
 *                      type: string
 *                      description: enter refreshToken for create new refresh and access token
 *                  
 */

/**
 * @swagger
 *  tags:
 *      name: User-Authentication
 *      description: user-auth
 */

/**
 * @swagger
 *  /user/get-otp:
 *      post:
 *          tags: [User-Authentication]
 *          summary: login user in userpanel with phone number
 *          description: Get OTP for login
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/GetOTP'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/GetOTP'
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
 *          tags: [User-Authentication]
 *          summary: check-otp value in user controller
 *          description: check otp with code mobile 
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/CheckOTP'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CheckOTP'
 *          responses:
 *              200:
 *                  description: checked successfully otp code
 */


router.post("/check-otp" , userAuthController.checkOtp);

/**
 * @swagger
 *  /user/refresh-token:
 *      post:
 *          tags: [User-Authentication]
 *          summary: send refresh token
 *          description: refresh token
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/RefreshToken'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/RefreshToken'
 *          responses:
 *              200:
 *                  description: success create new refresh token
 */
router.post("/refresh-token" , userAuthController.refreshToken);

module.exports = {
    UserAuthRoutes: router
}