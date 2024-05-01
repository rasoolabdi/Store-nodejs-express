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
 *         EditChapter:
 *              type: object
 *              properties:
 *                  title:
 *                     type: string
 *                     example: "فصل ۱ : آموزش مقدماتی تود جی اس"
 *                  text:
 *                      type: string
 *                      example: "توضیحات مربوط به این فصل"
 */

/**
 * @swagger
 *  definitions:
 *      chapterOfCourseDefinition:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  exapmle: 200
 *              data: 
 *                  type: object
 *                  properties:
 *                      course:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id: 
 *                                      type: string
 *                                      example: "6628fd025e7b8e186ca409a4"
 *                                  title:
 *                                      type: string
 *                                      example: title of course
 *                                  chapters:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          properties:
 *                                              _id: 
 *                                                  type: string
 *                                                  example: "6628fd025e7b8e186ca409a4"
 *                                              title:
 *                                                  type: string
 *                                                  example: "title of chapter"
 *                                              text:
 *                                                  type: string
 *                                                  example: "text of chapter"
 *                                      
 *                                      
 *                          
 * 
 *                  
 *                
 */


/**
 * @swagger 
 *  /admin/chapter/add-chapter:
 *       put:
 *          tags: [Chapters(AdminPanel)]
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
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 *              
 */

/**
 * @swagger
 *  /admin/chapter/list/{courseId}:
 *      get:
 *          tags: [Chapters(AdminPanel)]
 *          summary: get chapters by id from courses
 *          parameters:
 *              -   name: courseId
 *                  in: path
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: getChapterOfCourse successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/chapterOfCourseDefinition'
 */

/**
 * @swagger
 *  /admin/chapter/remove/{chapterId}:
 *      patch:
 *          tags: [Chapters(AdminPanel)]
 *          summary: delete one chapter of course
 *          parameters:
 *              -   name: chapterId
 *                  in: path
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: deleteOneChapter successfully
 *                  content:
 *                      application.json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */

/**
 * @swagger
 *  /admin/chapter/update/{chapterId}:
 *      patch:
 *          tags: [Chapters(AdminPanel)]
 *          summary: update detail of chapter from course by Id
 *          parameters:
 *              -   name: chapterId
 *                  in: path
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/EditChapter'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/EditChapter'
 *          responses:
 *              200:
 *                  description: update chapter successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */