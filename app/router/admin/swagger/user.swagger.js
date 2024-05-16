

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