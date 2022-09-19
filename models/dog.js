const mongoose = require("mongoose");

const DogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    required: true,
  },
  breed: {
    type: String,
    required: true,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    required: true,
  },
  isGoodBoy: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const Dog = mongoose.model("Dog", DogSchema);

module.exports = { Dog };