const express = require("express");

const { ProductController } = require("./../controllers/product.controller");

const router = express.Router();

router
    .route('/')
    .post(ProductController.create.bind(ProductController))
    .get(ProductController.find.bind(ProductController))

router
    .route('/:id')
    .put(ProductController.update.bind(ProductController))
    .patch(ProductController.update.bind(ProductController))
    .get(ProductController.findOne.bind(ProductController))
    .delete(ProductController.delete.bind(ProductController))

module.exports = { productRoutes: router };
