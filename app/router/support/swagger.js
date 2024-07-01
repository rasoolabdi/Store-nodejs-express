/**
 * @swagger
 *  tags: 
 *      -   name: Support
 *          description: support chat 
 */

/**
 * @swagger
 *  components: 
 *      schemas: 
 *          AddNameSpace:
 *              type: object
 *              required: 
 *                  -   title
 *                  -   endpoint
 *              properties:
 *                  title: 
 *                      type: string
 *                      description: the title of namespace
 *                  endpoint:
 *                      type: string
 *                      description: the endpoint of namespace
 * 
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Room:
 *              type: object
 *              required: 
 *                  -   name
 *                  -   description
 *                  -   namespace
 *              properties:
 *                  name:
 *                      type: string
 *                      description: the name of room
 *                  description:
 *                      type: string
 *                      description: the description of text of blog
 *                  image:
 *                      type: file
 *                      description: the index picture of blog
 *                  namespace: 
 *                      type: string
 *                      description: namespace of conversation
 * 
 */

/**
 * @swagger
 *  /support/namespace/add:
 *      post: 
 *          tags: [Support]
 *          summary: add namespace for chatRoom
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: "#/components/schemas/AddNameSpace"
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/AddNameSpace"
 *          responses:
 *              201:
 *                  description: create namespace successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/publicDefinition"
 * 
 */

/**
 * @swagger
 *  /support/namespace/getAllNamespace:
 *      get:
 *         tags: [Support]
 *         summary: get all namespace
 *         responses:
 *             200:
 *                 description: getAllNamespace successfully
 *                 content:
 *                     application/json:
 *                         schema:
 *                             $ref: "#/definitions/publicDefinition"
 */

/**
 * @swagger
 *  /support/room/add:
 *      post:
 *          tags: [Support]
 *          summary: add new room in namespace for chatroom
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: "#/components/schemas/Room"
 *          responses:
 *              200:
 *                  decription: add new room successfully
 *                  content:
 *                      application/json:
 *                          $ref: "#/definitions/publicDefinition"
 * 
 *              
 */

/**
 * @swagger
 *  /support/room/getAllRooms:
 *      get:
 *          tags: [Support]
 *          summary: get all rooms 
 *          responses:
 *              200:
 *                  description: getAllRooms successfully
 */