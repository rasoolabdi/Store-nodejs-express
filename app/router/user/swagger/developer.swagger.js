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

/**
 * @swagger
 *  /developer/random-number:
 *      get:
 *          tags: [Developer-Routes]
 *          summary: get random number 
 *          responses: 
 *              200:
 *                  description: random number successfully
 *          
 */