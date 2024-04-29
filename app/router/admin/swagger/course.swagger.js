
/**
 * @swagger
 *  components:
 *      schemas:
 *          Types:
 *               type: string
 *               enum:
 *                  -   free
 *                  -   cash
 *                  -   special
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Status:
 *              type: string
 *              enum:
 *                  -   notStarted
 *                  -   Holding    
 *                  -   Completed
 */  
 

/**
 * @swagger
 *  definitions:
 *      ListOfCourses:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                       courses:
 *                          type: array
 *                          items: 
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "662e1562785dd66a5341845a" 
 *                                  title: 
 *                                      type: string
 *                                      example: "summary title of course"
 *                                  short_text:
 *                                      type: string
 *                                      example: "summary short_text of course"
 *                                  text: 
 *                                      type: string
 *                                      example: "text and describe of course"
 *                                  status: 
 *                                      type: string
 *                                      example: "notStarted | Holding | Completed"
 *                                  time: 
 *                                      type: string
 *                                      example: 10:20:45
 *                                  price: 
 *                                      type: integer
 *                                      example: 250000
 *                                  discount: 
 *                                      type: integer
 *                                      example: 20
 *                                  studentCount: 
 *                                      type: integer
 *                                      example: 340
 *                                  teacher: 
 *                                      type: string 
 *                                      example: "rasool abdi"
 */

/**
 * 
 * @swagger
 *  definitions:
 *      publicDefinition:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 20x
 *              data:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          example: "the best message for that action"
 */



/**
 * @swagger
 *  components:
 *      schemas:
 *          InsertCourse:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text    
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   image
 *                  -   type
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of course
 *                      example: عنوان دوره
 *                  short_text:
 *                      type: string
 *                      description: the short_text of course
 *                      example: متن کوتاه از دوره
 *                  text:
 *                      type: string
 *                      description: the text of course
 *                      example: توضیحات کامل دوره
 *                  tags:
 *                      type: array
 *                      description: the tags of course
 *                  category:
 *                      type: string
 *                      description: the category of course
 *                      example: 6628fd025e7b8e186ca409a4
 *                  price:
 *                      type: string
 *                      description: the price of course
 *                      example: قیمت دوره
 *                  discount:
 *                      type: string
 *                      description: the discount of course
 *                      example: تخفیف دوره
 *                  type: 
 *                      $ref: '#/components/schemas/Types'
 *                  status:
 *                      $ref: '#/components/schemas/Status'
 *                  image:
 *                      type: string
 *                      format: binary
 *                      description: the image of course
 *                  
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *         AddChapter:
 *              type: object
 *              required:
 *                  -   id
 *                  -   title
 *              properties:
 *                  id:
 *                     type: string
 *                     example: 6628fd025e7b8e186ca409a4
 *                  title:
 *                     type: string
 *                     example: "فصل ۱ : آموزش مقدماتی تود جی اس"
 *                  text:
 *                      type: string
 *                      example: "توضیحات مربوط به این فصل"
 */

/**
 * @swagger
 *  /admin/courses/add:
 *      post:
 *          tags: [Course(AdminPanel)]
 *          summary: add one new course
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/InsertCourse'
 *          responses:
 *              201:
 *                  description: create new course successfully
 *                  content:
 *                     application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition' 
 */

/**
 * @swagger
 *  /admin/courses/allCourses:
 *      get:
 *         tags: [Course(AdminPanel)]
 *         summary: get all courses
 *         parameters:
 *              -   name: search
 *                  in: query
 *                  type: string
 *                  description: ssearch in courses title , short_text , text
 *         responses:
 *              200:
 *                  description: getAllCourses successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfCourses'
 */

/**
 * @swagger
 *  /admin/courses/{id}:
 *      get:
 *          tags: [Course(AdminPanel)]
 *          summary: get one course by id
 *          parameters: 
 *              -   name: id
 *                  in: path
 *                  required: true
 *                  type: string
 *          responses:
 *              200:
 *                  description: getCourseById successfully
 */

/**
 * @swagger 
 *  /admin/courses/add-chapter:
 *      put:
 *          tags: [Course(AdminPanel)]
 *          summary: add new chapter to course
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema: 
 *                          $ref: '#/components/schemas/AddChapter'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AddChapter'
 *          responses:
 *              201:
 *                  description: create new chapter successfully
 *              
 */