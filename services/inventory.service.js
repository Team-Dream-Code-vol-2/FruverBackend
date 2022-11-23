const { GenericService } = require("./generic.service");
const { InventoryModel } = require("../models/inventory.model")

class InventoryService extends GenericService {
    constructor () {
        if (!InventoryService.instance) {
            super(InventoryModel);
            InventoryService.instance = this;
        }
        return InventoryService.instance;
    }

    async getAvailableProducts() {
        return this.model.find({ units: { $gt: 0 } }).populate("product");
    }

    async changeInventory(productId, amount, operation) {
        const filter = { product: productId }
        const inventory = await this.findOneOrCreate(filter);
        const newAmount = inventory.units + (operation === 'add' ? amount : -amount);
        return this.update(filter, { units: newAmount });
    }
    
    async findOneOrCreate (filter) {
        const inventory = await this.findOne(filter)
        if (!inventory) {
            return this.create({ ...filter, units: 0 })
        }
        return inventory
    }
}

module.exports = { InventoryService: new InventoryService() }