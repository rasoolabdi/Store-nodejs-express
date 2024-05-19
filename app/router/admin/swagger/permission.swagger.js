
/**
 * @swagger
 *  definitions:
 *      ListOfPermissions:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      permissions:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string    
 *                                      example: "662e1562785dd66a5341845a"
 *                                  name:
 *                                      type: string
 *                                      example: "the name of permission"
 *                                  description:
 *                                      type: string
 *                                      example: "desc of permission"
 *              
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Permission:
 *              type: object
 *              required:
 *                  -   name
 *                  -   description
 *              properties:
 *                  name:
 *                      type: string
 *                      description: the name of Permission
 *                  description:
 *                      type: string
 *                      description: the description of permission
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          UpdatePermission:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      description: the name of Permission
 *                  description:
 *                      type: string
 *                      description: the description update for permission
 *                      
 */

/**
 * @swagger
 *  /admin/permission/add:
 *      post:
 *          tags: [RBAC(AdminPanel)]
 *          summary: create new Permission 
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/Permission"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Permission"
 *          responses:
 *              201:
 *                  description: create new Permission successfully
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/publicDefinition"
 *                  
 *              
 */         

/**
 * @swagger
 *  /admin/permission/update/{id}:
 *      patch:
 *          tags: [RBAC(AdminPanel)]
 *          summary: update permission by id
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
 *                          $ref: "#/components/schemas/UpdatePermission"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/UpdatePermission"
 * 
 *          responses:
 *              200:
 *                  description: updatePermission successfully
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/publicDefinition"
 * 
 */

/**
 * @swagger
 *  /admin/permission/allPermissions:
 *      get:
 *          tags: [RBAC(AdminPanel)]
 *          summary: get all permissions
 *          responses:
 *              200:
 *                  description: getAllPermission successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/ListOfPermissions"
 */


/**
 * @swagger
 *  /admin/permission/remove/{id}:
 *      delete:
 *          tags: [RBAC(AdminPanel)]
 *          summary: delete permission by id
 *          parameters:
 *              -   name: id
 *                  in: path
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: removePermission successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/publicDefinition"
 * 
 * 
 */

