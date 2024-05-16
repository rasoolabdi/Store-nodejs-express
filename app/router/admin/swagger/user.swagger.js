/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdateProfile:
 *              type: object
 *              properties:
 *                  first_name:
 *                      type: string
 *                      description: the first_name of user
 *                      example: rasool
 *                  last_name:
 *                      type: string
 *                      description: the last_name of user
 *                      example: abdi
 *                  email:
 *                      type: string
 *                      description: the email of user
 *                      example: rasool@yahoo.com
 *                  username:
 *                      type: string
 *                      description: the username of user
 *                      example: rasoolabdi123
 */

/**
 * @swagger
 *  definitions:
 *      ListOfUsers:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      users:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "6645e8a9769c918c08c79eef"
 *                                  mobile:
 *                                      type: string
 *                                      example: "09331429284"
 *                                  first_name:
 *                                      type: string
 *                                      example: rasool
 *                                  last_name:
 *                                      type: string
 *                                      example: abdi
 *                                  email:
 *                                      type: string
 *                                      example: rasool@yahoo.com
 *                                  username:
 *                                      type: string
 *                                      example: rasool123
 *                  
 */


/**
 * @swagger 
 *  /admin/user/allUsers:
 *      get:
 *          tags: [Users(AdminPanel)]
 *          summary: get all users
 *          parameters:
 *              -   name: search
 *                  in: query
 *                  type: search
 *                  description: search in user such  first_name , last_name , mobile , email , username
 *          responses:
 *              200:
 *                  description: getAllUsers successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/publicDefinition"
 * 
 */

/**
 * @swagger
 *  /admin/user/update-profile:
 *      patch:
 *          tags: [Users(AdminPanel)]
 *          summary: update profile user
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateProfile'
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/UpdateProfile"
 *          responses:
 *              200:
 *                  description: update profile successfully
 *                  content:
 *                      appliaction/json:
 *                          schema:
 *                              $ref: "#/definitions/ListOfUsers"
 *          
 */