/**
 * @swagger
 *  components:
 *      schemas:
 *          Permissions:
 *              type: string
 *              enum: 
 *                  -   blog
 *                  -   course
 *                  -   product
 */

/**
 * @swagger
 *  definitions:
 *      ListOfRoles:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      role:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string    
 *                                      example: "662e1562785dd66a5341845a"
 *                                  title:
 *                                      type: string
 *                                      example: "the title of role"
 *                                  permission:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          properties:
 *                                              _id: 
 *                                                  type: integer
 *                                                  example: "662e1562785dd66a5341845a"
 *                                              title:
 *                                                  type: string
 *                                                  example: "the title of permission"
 *                                              description:
 *                                                  type: string
 *                                                  example: "the description of permission"
 *              
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Role:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of Role
 *                  permissions:
 *                      $ref: "#/components/schemas/Permissions"
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdateRole:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of Role
 *                  permissions:
 *                      $ref: "#/components/schemas/Permissions"
 */

/**
 * @swagger
 *  /admin/role/add:
 *      post:
 *          tags: [RBAC(AdminPanel)]
 *          summary: create new Role 
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/Role"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Role"
 *          responses:
 *              201:
 *                  description: create Role successfully
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/publicDefinition"
 *                  
 *              
 */         

/**
 * @swagger
 *  /admin/role/update/{id}:
 *      patch:
 *          tags: [RBAC(AdminPanel)]
 *          summary: update role by id
 *          parameters:
 *              -   name: id
 *                  in: path
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/UpdateRole"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/UpdateRole"
 * 
 *          responses:
 *              200:
 *                  description: updateRole successfully
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/publicDefinition"
 * 
 */

/**
 * @swagger
 *  /admin/role/allRoles:
 *      get:
 *          tags: [RBAC(AdminPanel)]
 *          summary: get all roles
 *          responses:
 *              200:
 *                  description: getAllRole successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/ListOfRoles"
 */


/**
 * @swagger
 *  /admin/role/remove/{id}:
 *      delete:
 *          tags: [RBAC(AdminPanel)]
 *          summary: delete role by id
 *          parameters:
 *              -   name: id
 *                  in: path
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: removeRole successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/publicDefinition"
 * 
 * 
 */

