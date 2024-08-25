const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const passRouter = require("./routes/gatePassRoutes");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/LKCTC_GATE_PASS")
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(passRouter);

app.listen(3000, () => {
  console.log("port running on 3000");
});
