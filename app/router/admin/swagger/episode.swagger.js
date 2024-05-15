

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
 *                      -   video
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
 *                      video:
 *                          type: string
 *                          description: the file of video (HH:mm:ss)
 *                          format: binary                      
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          EditEpisode:
 *              type: object
 *              parameters:
 *                  -   name: episodeId
 *                      in: path
 *                      required: true
 *                      type: string
 *              properties:
 *                  courseId:
 *                      type: string
 *                      description: course id of courses
 *                      example: "662f53491db19e40ea640360"
 *                  chapterId:
 *                      type: string
 *                      description: chapterId of courses
 *                      example: "66322baf69dea31117c4d1a4"
 *                  title:
 *                      type: string
 *                      description: title of episode
 *                      example: "ویدیو شماره یک - متغیرها"
 *                  text:
 *                      type: string
 *                      description: text of episode
 *                      example: "در این قسمت به طور کامل در رابطه با ...گفته شده است."
 *                  type: 
 *                      type: string
 *                      description: type of episode
 *                      enum:
 *                          -   unlock
 *                          -   lock
 *                  video:
 *                      type: string
 *                      description: get time video from episode
 *                      format: binary
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
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/AddEpisode'
 *          responses:
 *              201:
 *                 description: addNewEpisode successfully
 *                 content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */

/**
 * @swagger
 *  /admin/episode/remove/{episodeId}:
 *      delete:
 *          tags: [Episodes(AdminPanel)]
 *          summary: remove episode by id
 *          parameters:
 *              -   name: episodeId
 *                  in: path
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: removeEpisode successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/publicDefinition"
 * 
 */

/**
 * @swagger
 *  /admin/episode/update/{episodeId}:
 *      patch:
 *          tags: [Episodes(AdminPanel)]
 *          summary: update episode
 *          parameters:
 *              -   name: episodeId
 *                  in: path
 *                  required: true
 *                  type: string
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: "#/components/schemas/EditEpisode"
 *          responses:
 *              200:
 *                  description: edit episode successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/publicDefinition"
 */