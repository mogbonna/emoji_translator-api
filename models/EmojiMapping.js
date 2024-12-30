const mongoose = require("mongoose");

const emojiMappingSchema = new mongoose.Schema({
  word: {
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
});

module.exports = mongoose.model("EmojiMapping", emojiMappingSchema);
