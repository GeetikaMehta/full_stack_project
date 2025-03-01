const express = require("express");
const cors = require("cors");
const connection = require("./connection");
const categoryRoutes = require("./routes/category");
const sub_categoryRoutes = require("./routes/sub_category");
const productRoutes = require("./routes/product");
const car_brandsRoutes = require("./routes/car_brands");
const usersRoutes = require("./routes/users");
const locationRoutes = require("./routes/location");
const employeesRoutes = require("./routes/employees");
const roleRoutes = require("./routes/role");
const ordersRoutes = require("./routes/orders");
const paymentsRoutes = require("./routes/payments");
const wishlistRoutes = require("./routes/wishlist");


const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, resp) => {
    resp.send("<h1>Hello, world!</h1>");
});

app.use("/api/category", categoryRoutes);
app.use("/api/sub_category", sub_categoryRoutes);
app.use("/api/product" , productRoutes);
app.use("/api/car_brands" , car_brandsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/location" , locationRoutes);
app.use("/api/employees" , employeesRoutes);
app.use("/api/role" , roleRoutes);
app.use("/api/orders" , ordersRoutes);
app.use("/api/payments" , paymentsRoutes);
app.use("/api/wishlist" , wishlistRoutes);

const port = process.env.PORT || 7000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
