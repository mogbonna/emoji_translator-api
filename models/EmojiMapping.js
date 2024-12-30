const mongoose = require("mongoose");

const emojiMappingSchema = new mongoose.Schema({
  original: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  emoji: {
    type: String,
    required: true,
  },
  usageCount: {
    type: Number,
    default: 0,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("EmojiMapping", emojiMappingSchema);
