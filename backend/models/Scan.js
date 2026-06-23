const mongoose = require("mongoose");

const scanSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },

    plantName: {
      type: String,
      required: true,
    },

    disease: {
      type: String,
      required: true,
    },

    confidence: {
      type: Number,
      required: true,
    },

    treatment: {
      type: String,
      required: true,
    },

    watering: {
      type: String,
      required: true,
    },
  

    fertilizer: {
      type: String,
      required: true,
    },

    prevention: {
      type: String,
    },

    isHealthy: {
      type: Boolean,
      default: false,
    },

    healthConfidence: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Scan", scanSchema);