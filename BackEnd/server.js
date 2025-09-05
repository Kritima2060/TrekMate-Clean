require("dotenv").config();
const express = require("express");
const cors = require("cors");
const twilio = require("twilio");
const app = express();
const router = require("./routes/auth-route")
const connectDb =  require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
 
//Handling cors policy

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/auth", router);

app.use(errorMiddleware);


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