const { productRoutes } = require("./product.routes");
const { inventoryRoutes } = require("./inventory.routes");
const { saleRoutes } = require("./sale.routes");
const { userRoutes } = require("./user.routes");
const { authenticationRoutes } = require("./authentication.routes");

module.exports = {
    productRoutes,
    inventoryRoutes,
    saleRoutes,
    userRoutes,
    authenticationRoutes,
}