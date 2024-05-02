const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://darksideryukento:z1e2n3@cluster0.heow1w6.mongodb.net/restaurant?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => console.error(err));

const Schema = mongoose.Schema;

const foodSchema = new Schema({
    name: String,
    rate: String,
    imageUrl: String,
  });
  
  const Food = mongoose.model('Food', foodSchema);
  module.exports = Food;
