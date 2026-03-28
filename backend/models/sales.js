const mongoose = require("mongoose");

const SalesSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    revenue: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    month: {
      type: Number, 
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Sales", SalesSchema);