const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/LoginSignUpTutorial")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("Failed to connect", err);
  });

const LogInSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});


const collection = new mongoose.model("Collection1", LogInSchema);

module.exports=collection