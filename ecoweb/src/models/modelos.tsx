// const mongoose = require('mongoose');
// const mongooseDelete = require('mongoose-delete');

// const ProductSchema = new mongoose.Schema(
//     {
//         name: {
//             type: String,
//             required: true
//         },
//         description: {
//             type: String
//         },
//         price: {
//             type: Number,
//             required: true
//         },
//         discount: {
//             type: Number, // porcentaje: 0-100
//             default: 0
//         },
//         stock: {
//             type: Number,
//             default: 0
//         },
//         category: {
//             type: String,
//             required: true
//         },
//         sold: {
//             type: Number,
//             default: 0
//         },
//         attributes: [
//             {
//                 nombre: String,
//                 valor: String
//             }
//         ],
//         images: [String], // // Array de URLs de imágenes?? 
//         totalReview: {
//             type: Number
//         },
//         reviews: {
//             scoring: {
//                 type: Number,
//                 default: 0
//             },
//             totalRatings: {
//                 type: Number,
//                 default: 0
//             },
//             reviewTexts: [
//                 {
//                     user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
//                     rating: { type: Number, min: 1, max: 5 },
//                     comment: String,
//                     createdAt: { type: Date, default: Date.now }
//                 }
//             ]
//         }
//     },
//     {
//         timestamps: true
//     }
// );

// ProductSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
// module.exports = mongoose.model('product', ProductSchema);



// const mongoose = require('mongoose');
// const mongooseDelete = require('mongoose-delete');

// const OrderSchema = new mongoose.Schema(
//     {
//         client: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'user',
//             required: true
//         },
//         date: {
//             type: Date,
//             default: Date.now
//         },
//         total: {
//             type: Number,
//             required: true
//         },
//         state: {
//             type: String,
//             enum: ['pending', 'in-process', 'sent', 'received', 'cancelled'],
//             default: 'pending'
//         },
//         deliveryMethod: {
//             type: String,
//             enum: ['standard', 'express', 'urgent'],
//             default: 'standard'
//         },
//         items: [
//             {
//                 product: {
//                     type: mongoose.Schema.Types.ObjectId,
//                     ref: 'product'
//                 },
//                 quantity: Number,
//                 unit_price: Number
//             }
//         ],
//         shippingAddress: {
//             street: String,
//             number: String,
//             postal: String,
//             city: String,
//             province: String
//         }
//     },
//     {
//         timestamps: true
//     }
// );

// OrderSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
// module.exports = mongoose.model('order', OrderSchema);


// const mongoose = require('mongoose');
// const mongooseDelete = require('mongoose-delete');

// const UserScheme = new mongoose.Schema(
//     {
//         name: {
//             type: String
//         },
//         surnames: {
//             type: String
//         },
//         email: {
//             type: String,
//             required: true,
//             unique: true
//         },
//         emailCode: {
//             type: String
//         },
//         attempt: {
//             type: Number,
//             default: 0
//         },
//         phoneNumber: {
//             type: String
//         },
//         password: {
//             type: String,
//             select: false
//         },
//         status: {
//             type: Number,
//             default: 0
//         },
//         role: {
//             type: String,
//             enum: ['user', 'admin'],
//             default: 'user'
//         },
//         address: [
//             {
//                 nombre: String,
//                 street: String,
//                 number: String,
//                 postal: String,
//                 city: String,
//                 province: String
//             }
//         ],
//         urlToAvatar: {
//             type: String
//         }
//     },
//     {
//         timestamps: true
//     }
// );

// UserScheme.plugin(mongooseDelete, { overrideMethods: 'all' });
// module.exports = mongoose.model('user', UserScheme);

//añadir a usuarios, carrito, añadir tambien historial de pedidos ( si no , cuando hagamos la llamada, como los recibimos o como los mostramos ? )
// , reseñas no se pueden acceder ni modificar desde usuario?, user tiene que tener un adress isDefault
//deliveryMethod:  deberia estar en order o en product? cada product puede tener un deliveryMethod diferente
//reviewtext, añadir campo username para mostrarlo como en el figma
//Tambien hace falta en el figma pantalla para añadir / modificar direcciones
