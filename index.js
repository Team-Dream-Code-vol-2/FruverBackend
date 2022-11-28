const express = require("express");
const cors = require('cors')

const { Database } = require("./config/db");
const { ErrorHandler } = require("./middlewares/error.middleware");
const { productRoutes, inventoryRoutes, saleRoutes, userRoutes, authenticationRoutes } = require("./routes");
require("./middlewares/passport.middleware");

const PORT = 3000;
const app = express();
app.use(cors())

Database.connect();

app.use(express.json());
app.use("/products", productRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/sales", saleRoutes);
app.use("/users", userRoutes);
app.use("/auth", authenticationRoutes);


app.use((err, req, res, next) => {
    ErrorHandler(err, res)
})


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
