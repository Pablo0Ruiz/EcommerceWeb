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

//loginctrl devolver surname tras inicio de sesion o que directamente no devuelva nada solo ID y se hace peticion cada que se
//necesiten datos ( como por ej a la hora de cambiar en el perfil y asi se tienen mas actualizados )