const express = require("express");
const mongoose = require("mongoose");
const inventorySchema = new.mongoose.schema({
  product: {
    type: Number,
    required: true,
    unique: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const inventory = mongoose.model("inventory", inventorySchema);

mongoose
  .connect("mongodb://localhost:3000/mydatabase", {
    useNewUrlParse: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log("failed to connect to MongoDB", err);
  });
