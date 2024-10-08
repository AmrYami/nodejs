//Generated By Amr Awwad
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config({ path: "config.env" });
const globalError = require("./middlewares/errorMiddleware");

const dbConnection = require("./config/database");
const blogRoute = require("./routes/blogsRoute");
const customerRoute = require("./routes/customersRoute");
const productsRoute = require("./routes/productsRoute");
const cardsRoute = require("./routes/cardsRoute");
const plansRoute = require("./routes/plansRoute");
const paymentsRoute = require("./routes/paymentRoute");
const subscriptionsRoute = require("./routes/subscriptionsRoute");
const featuresRoute = require("./routes/featuresRoute");
const subBlogRoute = require("./routes/subBlogRoute");
const ApiErors = require("./utils/ApiErors");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");

// Connect with db
dbConnection();

const app = express();
app.use(express.json());

if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

// mount routes
app.use("/api/v1/customers", customerRoute);
app.use("/api/v1/products", productsRoute);
app.use("/api/v1/cards", cardsRoute);
app.use("/api/v1/plans", plansRoute);
app.use("/api/v1/payments", paymentsRoute);
app.use("/api/v1/subscriptions", subscriptionsRoute);
app.use("/api/v1/feature", featuresRoute);
app.use("/api/v1/blogs", blogRoute);
app.use("/api/v1/subblogs", subBlogRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
// if route doesnt exist
app.all("*", (req, res, next) => {
  next(new ApiErors(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware for express
app.use(globalError);

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log("app running");
});

// any errors not handled (outside express)
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});
