const express = require("express");
const mongoose = require("mongoose");
const UserRouter = require("./Routes/Routes");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.port

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.mongoUrl);

app.use("/api", UserRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
