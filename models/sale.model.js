const { Schema, model, ObjectId } = require("mongoose");

const TYPE_CART = 'CARRITO';
const TYPE_SALE = 'COMPRA';

const ProductSchema = new Schema({
    product: {
        type: ObjectId,
        ref: "products"
    },
    units: {
        type: Number,
        required: [true, 'Este campo es obligatorio'],
    },
    price: {
        type: Number,
        required: [true, 'Este campo es obligatorio'],
    },
});

// Create Schema
const SaleSchema = new Schema({
    products: {
        type: [ProductSchema],
        required: [true, 'Este campo es obligatorio'],
    },
    type: {
        type: String,
        enum: [TYPE_CART, TYPE_SALE],
        default: TYPE_CART
    },
    total: {
        type: Number,
        default: 0,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

SaleSchema.pre(["save"], function () {
    this.total = this.products.reduce((acc, { units, price }) => acc + units * price, 0);
});

SaleSchema.post(["findOneAndUpdate"], async function () {
    const doc = await this.model.findOne(this.getQuery());
    doc.total = doc.products.reduce((acc, { units, price }) => acc + units * price, 0);
    doc.save();
})

const SaleModel = model("sales", SaleSchema);

module.exports = { SaleModel }