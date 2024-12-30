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
    if (!text || text.trim()) {
      return res.status(400).json({
        error: "Text is required",
      });
    }
    // Check cache first
    const cachedResult = cache.get(`to-emoji:${text}`);
    if (cachedResult) {
      return res.json(cachedResult);
    }
    const translated = await translateToEmoji(text);

    // save  translation to history
    const translation = await Translation.create({
      original: text,
      translated,
      type: "text-to-emoji",
    });
    const reponse = {
      original: text,
      translated,
      timestamp: translation.timestamp,
    };

    // cache the result
    cache.set(`to-emoji:${text}`, response);

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.translateToText = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.trim()) {
      return res.status(400).json({
        error: "Emoji sequence is required",
      });
    }
    // Check cache first
    const cachedResult = cache.get(`to-text:${text}`);
    if (cachedResult) {
      return res.json(cachedResult);
    }
    const translated = await translateToText(text);

    // save  translation to history
    const translation = await Translation.create({
      original: text,
      translated,
      type: "emoji-to-text",
    });
    const reponse = {
      original: text,
      translated,
      timestamp: translation.timestamp,
    };

    // cache the result
    cache.set(`to-text:${text}`, response);

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
