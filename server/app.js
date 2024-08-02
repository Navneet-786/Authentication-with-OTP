require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { connectToDatabase } = require("./database/db_connection");
const router = require("./routes/userRoute");
connectToDatabase();

//middlewares
app.use(express.json());
app.use(cors());
app.use("/", router);

app.get("/", (req, res) => {
  res.status(200).json("server start");
});

app.listen(process.env.PORT, () => {
  console.log(`server is listening on ${process.env.PORT}`);
});
