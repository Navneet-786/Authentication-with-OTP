const mongoose = require("mongoose");
require("dotenv").config();
const db = process.env.DATABASE;
const connectToDatabase = () => {
  mongoose
    .connect(db)
    .then(() => {
      console.log(`db connection established !`);
    })
    .catch((err) => console.log(err));
};
module.exports = { connectToDatabase };
