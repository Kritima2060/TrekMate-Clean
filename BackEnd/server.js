const express = require("express");
const app = express();
const router = require("./routes/auth-route")
const connectDb =  require("./utils/db");
// const errorMiddleware = require("./middlewares/error-middlewares");
require("dotenv").config();



app.use(express.json());
app.use("/api/auth", router);

// app.use(errorMiddleware);


connectDb()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(5555, () => {
      console.log("server is running on http://localhost:5555");
    });
  })
  .catch((err) => {
    console.log("error connecting to database", err);
  });