const { response } = require("express");
const EmojiMapping = require("../models/EmojiMapping");
const Translation = require("../models/Translation");
const {
  translateToText,
  translateToEmoji,
} = require("../services/translationService");
const cache = require("../utils/cache");

exports.translateToEmoji = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        error: "Text is required",
      });
    }

    const mappings = await EmojiMapping.find();
    const wordToEmoji = {};
    mappings.forEach((m) => {
      wordToEmoji[m.word] = m.emoji;
    });

    const words = text.toLowerCase().split(" ");
    const translatedWords = words.map((word) => {
      return wordToEmoji[word] || word;
    });

    const translatedText = translatedWords.join(" ");

    // Save translation to history
    await Translation.create({
      original: text,
      translated: translatedText,
      type: "text-to-emoji",
    });

    res.json({
      success: true,
      data: {
        original: text,
        translated: translatedText,
      },
    });
  } catch (error) {
    console.error("Translation error:", error);
    res.status(500).json({
      success: false,
      error: "Translation failed",
    });
  }
};

// Translate emoji to text
exports.translateToText = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        error: "Emoji text is required",
      });
    }

    const mappings = await EmojiMapping.find();
    const emojiToWord = {};
    mappings.forEach((m) => {
      emojiToWord[m.emoji] = m.word;
    });

    const emojis = text.split(" ");
    const translatedWords = emojis.map((emoji) => {
      return emojiToWord[emoji] || emoji;
    });

    const translatedText = translatedWords.join(" ");

    // Save translation to history
    await Translation.create({
      original: text,
      translated: translatedText,
      type: "emoji-to-text",
    });

    res.json({
      success: true,
      data: {
        original: text,
        translated: translatedText,
      },
    });
  } catch (error) {
    console.error("Translation error:", error);
    res.status(500).json({
      success: false,
      error: "Translation failed",
    });
  }
};
