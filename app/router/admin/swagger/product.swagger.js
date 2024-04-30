/**
 * @swagger
 *  components:
 *      schemas:
 *          Color:
 *              type: array
 *              items:
 *                  type: string
 *                  enum:
 *                      -   black
 *                      -   white
 *                      -   gray
 *                      -   red
 *                      -   blue
 *                      -   green
 *                      -   pink
 *                      -   orange
 */

/**
 * @swagger
 *  definitions:
 *      getAllListOfProduct:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      products:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id: 
 *                                      type: string
 *                                      example: "662e1562785dd66a5341845a"
 *                                  title:
 *                                      type: string
 *                                      example: "summary title of product"
 *                                  short_text:
 *                                      type: string
 *                                      example: "short text of product"
 *                                  text:
 *                                      type: string
 *                                      example: "text and describe of product"
 *                                  tags:
 *                                      type: array
 *                                      example: [apple , sumsung]
 *                                  images:
 *                                      type: array
 *                                      example: [
 *                                          upload/product/02/01/02/1.png,
 *                                          upload/product/02/01/02/2.png
 *                                      ]
 *                                  category:
 *                                      type: string
 *                                      example: "662e1562785dd66a5341845a"
 *                                  price:
 *                                      type: integer
 *                                      example: 1500000
 *                                  discount:
 *                                      type: integer
 *                                      example: 10
 *                                  count:
 *                                      type: integer
 *                                      example: 30
 *                                  type: 
 *                                      type: string
 *                                      example: "physical or virtual"
 *                                  supplier:
 *                                      type: string
 *                                      example: "662e1562785dd66a5341845a"
 *                                  features:
 *                                      type: object
 *                                      properties:
 *                                          width: 
 *                                              type: integer
 *                                              example: 20
 *                                          height: 
 *                                              type: integer
 *                                              example: 20
 *                                          weight: 
 *                                              type: integer
 *                                              example: 20
 *                                          length: 
 *                                              type: integer
 *                                              example: 20
 *                                          colors: 
 *                                              type: array
 *                                              example: [red,pink]
 *                                                  
 *                                                  
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text    
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   count
 *                  -   type
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of product
 *                  short_text:
 *                      type: string
 *                      description: the short_text of product
 *                  text:
 *                      type: string
 *                      description: the text of product
 *                  tags:
 *                      type: array
 *                      description: the tags of product
 *                  colors: 
 *                      $ref: '#/components/schemas/Color'
 *                  category:
 *                      type: string
 *                      description: the category of product
 *                  price:
 *                      type: string
 *                      description: the price of product
 *                  discount:
 *                      type: string
 *                      description: the discount of product
 *                  count:
 *                      type: string
 *                      description: the count of product
 *                  type: 
 *                      type: string
 *                      description: the type of product
 *                      example: physical or virtual
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                      description: the image of product
 *                  height:
 *                      type: string
 *                      description: the heigth of product packet
 *                  weight:
 *                      type: string
 *                      description: the weigth of product packet
 *                  width:
 *                      type: string
 *                      description: the with of product packet
 *                  length:
 *                      type: string
 *                      description: the length of product packet
 *                  
 */


/**
 * @swagger
 *  components:
 *      schemas:
 *          EditProduct:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: the title of product
 *                  short_text:
 *                      type: string
 *                      description: the short_text of product
 *                  text:
 *                      type: string
 *                      description: the text of product
 *                  tags:
 *                      type: array
 *                      description: the tags of product
 *                  colors: 
 *                      $ref: '#/components/schemas/Color'
 *                  category:
 *                      type: string
 *                      description: the category of product
 *                  price:
 *                      type: string
 *                      description: the price of product
 *                  discount:
 *                      type: string
 *                      description: the discount of product
 *                  count:
 *                      type: string
 *                      description: the count of product
 *                  type: 
 *                      type: string
 *                      description: the type of product
 *                      example: physical or virtual
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                      description: the image of product
 *                  height:
 *                      type: string
 *                      description: the heigth of product packet
 *                  weight:
 *                      type: string
 *                      description: the weigth of product packet
 *                  width:
 *                      type: string
 *                      description: the with of product packet
 *                  length:
 *                      type: string
 *                      description: the length of product packet
 *                  
 */


/**
 * @swagger
 *  /admin/products/add:
 *      post:
 *          tags: [Product(AdminPanel)]
 *          summary: create and save products
 *          requestBody:
 *              required: true
 *              content: 
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          responses:
 *              201:
 *                  description: createProduct successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */


/**
 * @swagger
 *  /admin/products/edit/{id}:
 *      patch:
 *          tags: [Product(AdminPanel)]
 *          summary: update product by id
 *          parameters: 
 *              -   name: id
 *                  in: path
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema: 
 *                          $ref: '#/components/schemas/EditProduct'
 *          responses: 
 *              200:
 *                 description: updated product successfully
 *                 content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */


/**
 * @swagger
 *  /admin/products/allProducts:
 *      get:
 *          tags: [Product(AdminPanel)]
 *          summary: get all products
 *          parameters: 
 *              -   name: search
 *                  in: query
 *                  type: string
 *                  description: text or search in title , search by text title short_text of product
 *          responses: 
 *              200:
 *                  description: getAllProducts successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/getAllListOfProduct'
 */


/**
 * @swagger 
 *  /admin/products/{id}:
 *      get:
 *          tags: [Product(AdminPanel)]
 *          summary: get product by id
 *          parameters:
 *              -   name: id
 *                  in: path
 *                  required: true
 *                  type: string
 *          responses: 
 *              200:
 *                  description: getOneProductById successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/getAllListOfProduct'
 */


/**
 * @swagger
 *  /admin/products/remove/{id}:
 *      delete:
 *          tags: [Product(AdminPanel)]
 *          summary: delete one product by id
 *          parameters:
 *              -   name: id
 *                  in: path
 *                  required: true
 *                  type: string
 *          responses:
 *              200:
 *                  description: delete successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/publicDefinition'
 */