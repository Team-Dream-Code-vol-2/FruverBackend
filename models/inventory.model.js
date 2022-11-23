const { Schema, model, ObjectId } = require("mongoose");

// Create Schema
const InventorySchema = new Schema({
    product: {
        type: ObjectId,
        ref: "products",
        required: true,
    },
    units: {
        type: Number,
        required: true
    }
});

const InventoryModel = model("inventory", InventorySchema);

module.exports = { InventoryModel }