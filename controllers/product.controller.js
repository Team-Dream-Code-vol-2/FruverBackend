const { GenericController } = require("./generic.controller");
const { ProductService } = require("./../services/product.service");

class ProductController extends GenericController {
    constructor () {
        if (!ProductController.instance) {
            super(ProductService);
            ProductController.instance = this;
        }

        return ProductController.instance;
    }
}

module.exports = { ProductController: new ProductController() };
