

/**
 * @swagger
 *  components:
 *      schemas:
 *          AddEpisode:
 *                  type: object 
 *                  required: 
 *                      -   courseId
 *                      -   chapterId
 *                      -   title
 *                      -   text
 *                      -   time
 *                      -   type
 *                  properties:
 *                      courseId:
 *                          type: string
 *                          description: course id of course
 *                          example: "662f53491db19e40ea640360"
 *                      chapterId:
 *                          type: string
 *                          description: chapterId of course
 *                          example: "66322baf69dea31117c4d1a4"
 *                      title:
 *                          type: string
 *                          description: title of episode
 *                          example: "ویدیو شماره یک - متغیرها"
 *                      text:
 *                          type: string
 *                          description: text of episode
 *                          example: "در این قسمت به طور کامل در رابطه با ... گفته شده است ."
 *                      type:
 *                          type: string
 *                          description: type of episode
 *                          enum:
 *                              -   unlock
 *                              -   lock
 *                      time:
 *                          type: string
 *                          description: the time of video (HH:mm:ss)
 *                          example: 00:08:35
 *                      
 */

/**
 * @swagger
 *  /admin/episode/add:
 *      post:
 *          tags: [Episodes(AdminPanel)]
 *          summary: add new episode to chapter
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/AddEpisode'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AddEpisode'
 *          responses:
 *              200:
 *                 description: addNewEpisode successfully
 *                 content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */