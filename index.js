require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const userRouter = require("./controller/user.controller.js");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}));

// Health check route
app.get("/health", (req, res) => {
  res.status(200).send({ status: "ok", message: "Server is running!" });
});




// routes
app.use("/users", userRouter);

// server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on PORT ${PORT}`);
});
