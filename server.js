const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config({ path: "config.env" });
const globalError = require("./middlewares/errorMiddleware");

const dbConnection = require("./config/database");
const blogRoute = require("./routes/blogsRoute");
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
app.use("/api/v1/blogs", blogRoute);
app.use("/api/v1/subblogs", subBlogRoute);
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
