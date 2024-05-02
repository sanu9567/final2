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


const adminSchema = new Schema({
    username: String,
    email: String,
    password: String,
  });
  
  const Admin = mongoose.model('Admin', adminSchema);
  module.exports = Admin;
