const { GenericController } = require("./generic.controller");
const { InventoryService } = require("./../services/inventory.service");

class InventoryController extends GenericController {
    constructor() {
        if (!InventoryController.instance) {
            super(InventoryService);
            InventoryController.instance = this;
        }

        return InventoryController.instance;
    }

    async add({ params: { product: productId }, body: { amount } }, res, next) {
        try { res.status(200).json(await this.service.changeInventory(productId, amount, 'add')); }
        catch (error) { next(error); }
    }

    async subtract({ params: { product: productId }, body: { amount } }, res, next) {
        try { res.status(200).json(await this.service.changeInventory(productId, amount, 'subtract')); }
        catch (error) { next(error); }
    }

    async getAvailableProducts(req, res, next) {
        try { res.status(200).json(await this.service.getAvailableProducts()); }
        catch (error) { next(error); }
        
    }
}

module.exports = { InventoryController: new InventoryController() };
