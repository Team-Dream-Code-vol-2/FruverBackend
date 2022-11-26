const { GenericService } = require("./generic.service");
const { SaleModel } = require("../models/sale.model")

class SaleService extends GenericService {
    constructor () {
        if (!SaleService.instance) {
            super(SaleModel);
            SaleService.instance = this;
        }
        return SaleService.instance;
    }
    
    async findOne (filters= {}) {
        return this.model.findOne(filters).populate("products.product");
    }
}

module.exports = { SaleService: new SaleService() }