const express = require("express");

const { SaleController } = require("./../controllers/sale.controller");

const router = express.Router();

router
    .route('/')
    .post(SaleController.create.bind(SaleController))
    .get(SaleController.find.bind(SaleController))

router
    .route('/add-product')
    .post(SaleController.addProductToCart.bind(SaleController))

router
    .route('/:id/buy')
    .put(SaleController.confirmSale.bind(SaleController))

router
    .route('/:id')
    .put(SaleController.update.bind(SaleController))
    .patch(SaleController.update.bind(SaleController))
    .get(SaleController.findOne.bind(SaleController))
    .delete(SaleController.delete.bind(SaleController))

module.exports = { saleRoutes: router };
