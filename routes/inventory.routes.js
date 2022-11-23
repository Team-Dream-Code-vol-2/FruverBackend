const express = require("express");

const { InventoryController } = require("../controllers/inventory.controller");

const router = express.Router();

router
    .route('/')
    .get(InventoryController.find.bind(InventoryController));

router
    .route('/available-products')
    .get(InventoryController.getAvailableProducts.bind(InventoryController))

router
    .route('/:product')
    .get(InventoryController.findOne.bind(InventoryController))

router
    .route('/:product/add')
    .put(InventoryController.add.bind(InventoryController))

router
    .route('/:product/subtract')
    .put(InventoryController.subtract.bind(InventoryController))

module.exports = { inventoryRoutes: router };
