const { Router } = require("express");
const bcrypt = require("bcrypt");
const router = Router();

/**
 * @swagger
 *  tags:
 *      name: Developer-Routes
 *      description: developer Utils
 */

/**
 * @swagger
 *  /developer/password-hash/{password}:
 *      get:
 *          tags: [Developer-Routes]
 *          summary: hash password or hash data
 *          parameters: 
 *              -   in: path
 *                  type: string
 *                  name: password
 *                  required: true
 *          responses: 
 *              200:
 *                  description: success          
 * 
 */
router.get("password-hash/:password" , (req,res,next) => {
    const {password} = req.params;
    const salt = bcrypt.genSaltSync(10);
    return res.send(bcrypt.hashSync(password , salt))
})

module.exports = {
    DeveloperRoutes: router
}