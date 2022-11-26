const { GenericController } = require("./generic.controller");
const { SaleService } = require("./../services/sale.service");
const { ProductService } = require("./../services/product.service");
const { InventoryService } = require("./../services/inventory.service");

class SaleController extends GenericController {
    constructor () {
        if (!SaleController.instance) {
            super(SaleService);
            SaleController.instance = this;
        }

        return SaleController.instance;
    }

    async addProductToCart({ body: { product: productId, cart: cartId, units } }, res, next) {
        try {
            const cart = await this.service.findOne({ _id: cartId, type: 'CARRITO' });
            const { price } = await ProductService.findOne({ _id: productId })
            const newProduct = { product: productId, price, units };
            if (!cart) {
                const newCart = await this.service.create({ products: [newProduct] })
                res.status(201).json(await this.service.findOne({ _id: newCart._id }));
            } else {
                const products = (cart.products || [])
                const product = products.find(({ product }) => String(product) === productId);
                if (product) product.units += units;
                else products.push(newProduct)
                await this.service.update({ _id: cartId }, { products })
                res.status(200).json(await this.service.findOne({ _id: cartId }));
            }
        }
        catch (error) { next(error); }
    }

    async confirmSale({ params: { id: cartId } }, res, next) {
        try { 
            const cart = await this.service.findOne({ _id: cartId, type: 'CARRITO' });
            await Promise.all(cart.products.map(product => {
                return InventoryService.changeInventory(product.product, product.units, 'subtract');
            }))
            res.status(200).json(await this.service.update({ _id: cartId }, { type: 'COMPRA' }));
        } catch (error) { next(error); }
    }
}

module.exports = { SaleController: new SaleController() };
