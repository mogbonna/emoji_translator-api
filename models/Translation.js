const mongoose = require("mongoose");

const translationSchema = new mongoose.Schema(
  {
    original: {
      type: String,
      required: true,
      trim: true,
      maxLength: [500, "Original must not exceed 500 charcters"],
    },
    translated: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["text-to-emoji", "emoji-to-text"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Translation", translationSchema);
