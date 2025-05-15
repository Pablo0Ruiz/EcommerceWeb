// const express = require('express');
// const router = express.Router();
// const authMiddleware = require('../middleware/session');
// const { checkRol } = require('../middleware/rol');
// const {
//     validatorCreateOrder,
//     validatorGetOrder,
//     validatorUpdateOrderStatus
// } = require('../validators/order');
// const {
//     createOrder,
//     getOrders,
//     getOrderById,
//     updateOrderStatus,
//     deleteOrder
// } = require('../controllers/order');

// // Crear orden
// /**
//  * @openapi
//  * /api/order:
//  *   post:
//  *     tags:
//  *       - Order
//  *     summary: Crear una nueva orden
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/createOrder'
//  *     responses:
//  *       201:
//  *         description: Orden creada exitosamente
//  *       500:
//  *         description: Error en el servidor
//  *     security:
//  *       - bearerAuth: []
//  */
// router.post('/', authMiddleware, validatorCreateOrder, createOrder);

// // Obtener todas las órdenes del usuario autenticado
// /**
//  * @openapi
//  * /api/order:
//  *   get:
//  *     tags:
//  *       - Order
//  *     summary: Obtener todas las órdenes del usuario
//  *     responses:
//  *       200:
//  *         description: Lista de órdenes
//  *       500:
//  *         description: Error en el servidor
//  *     security:
//  *       - bearerAuth: []
//  */
// router.get('/', authMiddleware, getOrders);

// // Obtener una orden por ID
// /**
//  * @openapi
//  * /api/order/{id}:
//  *   get:
//  *     tags:
//  *       - Order
//  *     summary: Obtener una orden por ID
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: ID de la orden
//  *     responses:
//  *       200:
//  *         description: Detalle de la orden
//  *       403:
//  *         description: No autorizado
//  *       404:
//  *         description: Orden no encontrada
//  *       500:
//  *         description: Error en el servidor
//  *     security:
//  *       - bearerAuth: []
//  */
// router.get('/:id', authMiddleware, validatorGetOrder, getOrderById);

// // Actualizar estado de la orden (solo admin)
// /**
//  * @openapi
//  * /api/order/status:
//  *   patch:
//  *     tags:
//  *       - Order
//  *     summary: Actualizar el estado de una orden
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/updateOrderStatus'
//  *     responses:
//  *       200:
//  *         description: Orden actualizada
//  *       404:
//  *         description: Orden no encontrada
//  *       500:
//  *         description: Error en el servidor
//  *     security:
//  *       - bearerAuth: []
//  */
// router.patch(
//     '/status',
//     authMiddleware,
//     checkRol(['admin']),
//     validatorUpdateOrderStatus,
//     updateOrderStatus
// );

// // Eliminar una orden (lógica)
// /**
//  * @openapi
//  * /api/order/{id}:
//  *   delete:
//  *     tags:
//  *       - Order
//  *     summary: Eliminar una orden (borrado lógico)
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: ID de la orden
//  *     responses:
//  *       200:
//  *         description: Orden eliminada
//  *       403:
//  *         description: No autorizado
//  *       404:
//  *         description: Orden no encontrada
//  *       500:
//  *         description: Error en el servidor
//  *     security:
//  *       - bearerAuth: []
//  */
// router.delete('/:id', authMiddleware, validatorGetOrder, deleteOrder);

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const authMiddleware = require('../middleware/session');
// const { checkRol } = require('../middleware/rol');
// const { uploadMiddlewareMemory } = require('../utils/handleStorage');
// const {
//     createProduct,
//     getProducts,
//     getProductById,
//     updateProduct,
//     deleteProduct,
//     addImage,
//     addReview,
//     deleteReview
// } = require('../controllers/product');
// const {
//     validatorCreateProduct,
//     validatorGetProductById,
//     validatorUpdateProduct,
//     validatorDeleteProduct,
//     validatorAddImage,
//     validatorAddReview,
//     validatorDeleteReview
// } = require('../validators/product');

// /**
//  * @openapi
//  * /api/product:
//  *   post:
//  *     tags:
//  *       - Product
//  *     summary: Crear un nuevo producto
//  *     description: Crea un producto con la información proporcionada
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - name
//  *               - price
//  *               - category
//  *             properties:
//  *               name:
//  *                 type: string
//  *               description:
//  *                 type: string
//  *               price:
//  *                 type: number
//  *               discount:
//  *                 type: number
//  *               stock:
//  *                 type: number
//  *               category:
//  *                 type: string
//  *               attributes:
//  *                 type: array
//  *                 items:
//  *                   type: object
//  *                   properties:
//  *                     nombre:
//  *                       type: string
//  *                     valor:
//  *                       type: string
//  *     responses:
//  *       '201':
//  *         description: Producto creado correctamente
//  *       '422':
//  *         description: Error de validación
//  *       '500':
//  *         description: Error interno del servidor
//  */
// router.post('/', authMiddleware, checkRol(['admin']), validatorCreateProduct, createProduct);

// /**
//  * @openapi
//  * /api/product:
//  *   get:
//  *     tags:
//  *       - Product
//  *     summary: Listar productos con filtros
//  *     description: Obtiene productos y permite filtrar por precio, rating mínimo, categoría y ordenar por precio o más vendidos
//  *     parameters:
//  *       - in: query
//  *         name: minPrice
//  *         schema:
//  *           type: number
//  *         description: Precio mínimo filtrado
//  *       - in: query
//  *         name: maxPrice
//  *         schema:
//  *           type: number
//  *         description: Precio máximo filtrado
//  *       - in: query
//  *         name: minRating
//  *         schema:
//  *           type: number
//  *         description: Rating promedio mínimo
//  *       - in: query
//  *         name: sortBy
//  *         schema:
//  *           type: string
//  *           enum: [sold, priceAsc, priceDesc]
//  *         description: Ordenar por 'sold', 'priceAsc' o 'priceDesc'
//  *       - in: query
//  *         name: category
//  *         schema:
//  *           type: string
//  *         description: Filtrar por categoría
//  *     responses:
//  *       '200':
//  *         description: Lista de productos
//  *       '500':
//  *         description: Error interno del servidor
//  */
// router.get('/', getProducts);

// /**
//  * @openapi
//  * /api/product/{id}:
//  *   get:
//  *     tags:
//  *       - Product
//  *     summary: Obtener un producto por ID
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: ID del producto
//  *     responses:
//  *       '200':
//  *         description: Detalles del producto
//  *       '404':
//  *         description: Producto no encontrado
//  *       '500':
//  *         description: Error interno del servidor
//  */
// router.get('/:id', validatorGetProductById, getProductById);

// /**
//  * @openapi
//  * /api/product/{id}:
//  *   put:
//  *     tags:
//  *       - Product
//  *     summary: Actualizar un producto
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: ID del producto
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *               description:
//  *                 type: string
//  *               price:
//  *                 type: number
//  *               discount:
//  *                 type: number
//  *               stock:
//  *                 type: number
//  *               category:
//  *                 type: string
//  *     responses:
//  *       '200':
//  *         description: Producto actualizado correctamente
//  *       '404':
//  *         description: Producto no encontrado
//  *       '500':
//  *         description: Error interno del servidor
//  */
// router.put('/:id', authMiddleware, checkRol(['admin']), validatorUpdateProduct, updateProduct);

// /**
//  * @openapi
//  * /api/product/{id}:
//  *   delete:
//  *     tags:
//  *       - Product
//  *     summary: Eliminar un producto (borrado lógico)
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: ID del producto a eliminar
//  *     responses:
//  *       '200':
//  *         description: Producto eliminado correctamente
//  *       '404':
//  *         description: Producto no encontrado
//  *       '500':
//  *         description: Error interno del servidor
//  */
// router.delete('/:id', authMiddleware, checkRol(['admin']), validatorDeleteProduct, deleteProduct);

// /**
//  * @openapi
//  * /api/product/{productId}/addimage:
//  *   patch:
//  *     tags:
//  *       - Product
//  *     summary: Añadir imagen a un producto
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: ID del producto
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         multipart/form-data:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               image:
//  *                 type: string
//  *                 format: binary
//  *               alt:
//  *                 type: string
//  *                 description: Texto alternativo de la imagen
//  *     responses:
//  *       '200':
//  *         description: Imagen añadida correctamente
//  *       '400':
//  *         description: Error en la solicitud
//  *       '500':
//  *         description: Error interno del servidor
//  */
// router.patch(
//     '/:productId/addimage',
//     authMiddleware,
//     uploadMiddlewareMemory.single('image'),
//     validatorAddImage,
//     addImage
// );

// /**
//  * @openapi
//  * /api/product/{id}/review:
//  *   post:
//  *     tags:
//  *       - Product
//  *     summary: Añadir una reseña a un producto
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: ID del producto
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - rating
//  *               - comment
//  *             properties:
//  *               rating:
//  *                 type: integer
//  *                 minimum: 1
//  *                 maximum: 5
//  *               comment:
//  *                 type: string
//  *     responses:
//  *       '201':
//  *         description: Reseña añadida correctamente
//  *       '400':
//  *         description: Ya existe una reseña del usuario
//  *       '404':
//  *         description: Producto no encontrado
//  *       '500':
//  *         description: Error interno del servidor
//  */
// router.post('/:id/review', authMiddleware, validatorAddReview, addReview);

// /**
//  * @openapi
//  * /api/product/{productId}/review/{reviewId}:
//  *   delete:
//  *     tags:
//  *       - Product
//  *     summary: Eliminar una reseña de un producto
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: productId
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: ID del producto
//  *       - in: path
//  *         name: reviewId
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: ID de la reseña a eliminar
//  *     responses:
//  *       '200':
//  *         description: Reseña eliminada correctamente
//  *       '403':
//  *         description: No autorizado
//  *       '404':
//  *         description: Producto o reseña no encontrado
//  *       '500':
//  *         description: Error interno del servidor
//  */
// router.delete('/:productId/review/:reviewId', authMiddleware, validatorDeleteReview, deleteReview);

// module.exports = router;


// const express = require('express');
// const { checkRol } = require('../middleware/rol');
// const authMiddleware = require('../middleware/session');
// const { uploadMiddlewareMemory } = require('../utils/handleStorage');
// const {
//     validatorRegister,
//     validatorLogin,
//     validatorEmailCode,
//     validatorEmailRecover,
//     validatorEmail,
//     validatorChangePassword,
//     validatorGetUser,
//     validatorUpdate
// } = require('../validators/user');
// const {
//     registerCtrl,
//     loginCtrl,
//     validateEmail,
//     validateEmailRecover,
//     recoverPass
// } = require('../controllers/auth');
// const {
//     getUser,
//     updateUser,
//     deleteUser,
//     restoreUser,
//     changePassword,
//     addImage
// } = require('../controllers/user');
// const router = express.Router();

// // Obtener usuario especifivo
// /**
//  * @openapi
//  * /api/user/profile:
//  *   get:
//  *     tags:
//  *       - User
//  *     summary: Obtener un usuario por id
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         description: ID del usuario
//  *         required: true
//  *         schema:
//  *           type: string
//  *     responses:
//  *       '200':
//  *         description: Usuario obtenido
//  *       '404':
//  *         description: No se encontró el usuario
//  *       '500':
//  *         description: Error en el servidor
//  *     security:
//  *       - bearerAuth: []
//  */
// router.get('/profile', authMiddleware, getUser);

// /**
//  * @openapi
//  * /api/user/register:
//  *  post:
//  *      tags:
//  *      - User
//  *      summary: User registration
//  *      description: Registers a new user with an email and password
//  *      requestBody:
//  *          content:
//  *              application/json:
//  *                  schema:
//  *                      $ref: "#/components/schemas/userRegister"
//  *      responses:
//  *          '200':
//  *              description: Returns the inserted object and JWT Token
//  *              content:
//  *                  application/json:
//  *                      schema:
//  *                          $ref: "#/components/schemas/userData"
//  *          '409':
//  *              description: User exists.
//  *          '422':
//  *              description: Validation error. The request body contains invalid fields.
//  *          '500':
//  *              description: Internal server error.
//  */
// router.post('/register', validatorRegister, registerCtrl);

// /**
//  * @openapi
//  * /api/user/login:
//  *  post:
//  *      tags:
//  *      - User
//  *      summary: "User login"
//  *      description: Login a user with email and password
//  *      requestBody:
//  *          content:
//  *              application/json:
//  *                  schema:
//  *                      $ref: "#/components/schemas/userLogin"
//  *      responses:
//  *          '200':
//  *              description: Ok. Returns the JWT Token.
//  *              content:
//  *                  application/json:
//  *                      schema:
//  *                          $ref: "#/components/schemas/userDataLogin"
//  *          '401':
//  *              description: User is not validated.
//  *          '404':
//  *              description: User not found.
//  *          '422':
//  *              description: Validation error. The request body contains invalid fields.
//  *          '500':
//  *              description: Internal server error
//  */
// router.post('/login', validatorLogin, loginCtrl);

// /**
//  * @openapi
//  * /api/user/validation-mail:
//  *  put:
//  *      tags:
//  *      - User
//  *      summary: "User email validation"
//  *      description: Validates the user's mail
//  *      requestBody:
//  *          content:
//  *              application/json:
//  *                  schema:
//  *                      $ref: "#/components/schemas/mailCode"
//  *      responses:
//  *          '200':
//  *              description: Ok. Changes status field to 1 and returns an object with acknowledged to true
//  *          '401':
//  *              description: Unauthorized. Authentication token is missing or invalid.
//  *          '422':
//  *              description: Validation error. The request body contains invalid fields.
//  *          '500':
//  *              description: Internal server error
//  *      security:
//  *          - bearerAuth: []
//  */
// router.put('/validation-mail', authMiddleware, validatorEmailCode, validateEmail);

// /**
//  * @openapi
//  * /api/user/validation-psswd:
//  *  put:
//  *      tags:
//  *      - User
//  *      summary: "User email validation to recover password"
//  *      description: Validates the user's mail
//  *      requestBody:
//  *          content:
//  *              application/json:
//  *                  schema:
//  *                      $ref: "#/components/schemas/mailRecover"
//  *      responses:
//  *          '200':
//  *              description: Ok. Returns user and token to change the password
//  *              content:
//  *                  application/json:
//  *                      schema:
//  *                          $ref: "#/components/schemas/userData"
//  *          '401':
//  *              description: Unauthorized. Authentication token is missing or invalid.
//  *          '422':
//  *              description: Validation error. The request body contains invalid fields.
//  *          '500':
//  *              description: Internal server error
//  */
// router.put('/validation-psswd', validatorEmailRecover, validateEmailRecover);

// /**
//  * @openapi
//  * /api/user/recover-psswd:
//  *  put:
//  *      tags:
//  *      - User
//  *      summary: "Recover token"
//  *      description: Recover user token to validate and change password
//  *      requestBody:
//  *          content:
//  *              application/json:
//  *                  schema:
//  *                      $ref: "#/components/schemas/mailUser"
//  *      responses:
//  *          '200':
//  *              description: OK. Send mail with code to verify.
//  *              content:
//  *                  application/json:
//  *                      schema:
//  *                          $ref: "#/components/schemas/userData"
//  *          '404':
//  *              description: User email not found.
//  *          '409':
//  *              description: User is not validated.
//  *          '422':
//  *              description: Validation error. The request body contains invalid fields.
//  *          '500':
//  *              description: Internal server error
//  */
// router.put('/recover-psswd', validatorEmail, recoverPass);

// // Actualización de un usuario
// /**
//  * @openapi
//  * /api/user/profile:
//  *   put:
//  *     tags:
//  *       - User
//  *     summary: Actualizar un usuario
//  *     parameters:
//  *     requestBody:
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: "#/components/schemas/userUpdate"
//  *     responses:
//  *       '200':
//  *         description: Usuario actualizado
//  *       '404':
//  *         description: No se encontró el usuario
//  *       '500':
//  *         description: Error en el servidor
//  *     security:
//  *       - bearerAuth: []
//  */
// router.put('/profile', authMiddleware, validatorUpdate, updateUser);

// /**
//  * @openapi
//  * /api/user/changepswd:
//  *  put:
//  *      tags:
//  *      - User
//  *      summary: Change password for a user
//  *      description: Allows a user to update its password by verifying the current password.
//  *      requestBody:
//  *          content:
//  *              application/json:
//  *                  schema:
//  *                      type: object
//  *                      properties:
//  *                          currentPassword:
//  *                              type: string
//  *                              example: OldPassword123
//  *                          newPassword:
//  *                              type: string
//  *                              example: NewPassword456
//  *                      required:
//  *                          - currentPassword
//  *                          - newPassword
//  *      responses:
//  *          '200':
//  *              description: Password successfully changed
//  *          '401':
//  *              description: Unauthorized - Incorrect current password
//  *          '404':
//  *              description: User not found
//  *          '400':
//  *              description: Validation error
//  *          '500':
//  *              description: Server error
//  *      security:
//  *          - bearerAuth: []
//  */
// router.put('/changepswd', authMiddleware, validatorChangePassword, changePassword);

// // Eliminar un usuario
// /**
//  * @openapi
//  * /api/user:
//  *   delete:
//  *     tags:
//  *       - User
//  *     summary: Eliminar un usuario (borrado lógico o físico)
//  *     parameters:
//  *       - name: logic
//  *         in: query
//  *         description: "true para borrado lógico, false para físico (por defecto físico)"
//  *         schema:
//  *           type: string
//  *     responses:
//  *       '200':
//  *         description: Usuario eliminado
//  *       '404':
//  *         description: No se encontró el usuairo
//  *       '500':
//  *         description: Error en el servidor
//  *     security:
//  *       - bearerAuth: []
//  */
// router.delete('/', authMiddleware, deleteUser);

// // Retornar un usuario
// /**
//  * @openapi
//  * /api/user/restore/{id}:
//  *   patch:
//  *     tags:
//  *       - User
//  *     summary: Restaurar un usuario eliminado lógicamente
//  *     parameters:
//  *       - name: id
//  *         in: path
//  *         description: ID del usuario a restaurar
//  *         required: true
//  *         schema:
//  *           type: string
//  *     responses:
//  *       '200':
//  *         description: Usuario restaurado
//  *       '404':
//  *         description: No se encontró el usuario o no está eliminado
//  *       '500':
//  *         description: Error en el servidor
//  *     security:
//  *       - bearerAuth: []
//  */
// router.patch('/restore/:id', authMiddleware, checkRol(['admin']), validatorGetUser, restoreUser);

// /**
//  * @openapi
//  * /api/user/addimage:
//  *  patch:
//  *      tags:
//  *      - User
//  *      summary: Add an image to a user
//  *      description: Adds an image to the image array of the specified user by its CIF
//  *      requestBody:
//  *          content:
//  *              multipart/form-data:
//  *                  schema:
//  *                      type: object
//  *                      properties:
//  *                          image:
//  *                              type: string
//  *                              format: binary
//  *      responses:
//  *          '200':
//  *              description: Successfully added the image
//  *          '400':
//  *              description: Already existing image in db
//  *          '403':
//  *              description: Validation error
//  *          '404':
//  *              description: user not found
//  *          '500':
//  *              description: Server error
//  *      security:
//  *          - bearerAuth: []
//  */
// router.patch('/addimage', authMiddleware, uploadMiddlewareMemory.single('image'), addImage);

// module.exports = router;


// //asi se crean 

// POST {{baseUrl}} HTTP/1.1
// Content-Type: application/json
// Authorization: Bearer {{adminToken}}

// {
//     "name": "la judia",
//     "description": "la verdosa",
//     "price": 15.99,
//     "discount": 10,
//     "stock": 40,
//     "category": "Yerbas",
//     "attributes": [
//     { "nombre": "rocha", "valor": "milipili" }
// ]
// }
