const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type:String},
    price: {type:Number}
});

const Product = mongoose.model('Product', productSchema);


const cartSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product:{ type: mongoose.Schema.Types.ObjectId, ref: 'Product',},
    quantity:{type:Number,default:1}
});

const Cart = mongoose.model('Order', cartSchema);

module.exports = {
  Product,
  Cart
}
