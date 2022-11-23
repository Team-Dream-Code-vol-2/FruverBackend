const { GenericService } = require("./generic.service");
const { ProductModel } = require("../models/product.model")

class ProductService extends GenericService {
    constructor () {
        if (!ProductService.instance) {
            super(ProductModel);
            ProductService.instance = this;
        }
        return ProductService.instance;
    }
}

module.exports = { ProductService: new ProductService() }