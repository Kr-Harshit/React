const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = express.Router();
require("dotenv/config");

const app = express();

const postsRoute = require("./Routes/kitchenRoute");

//Middlewares
app.use(cors());
app.use(express.json());
// app.use(express.static("public"));

//ROUTES
app.use("/kitchen", postsRoute);

//Login route
app.post("/login", async (req, res) => {
  const user = req.body.userId;
  const password = req.body.password;
  if (user === "admin" && password == "admin") res.send("OK");
  res.send("fail");
});

//Connect DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => console.log("connected to db")
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on ${PORT}`));
