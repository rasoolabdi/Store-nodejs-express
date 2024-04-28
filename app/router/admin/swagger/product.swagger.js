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
 */