const EmojiMapping = require("../models/EmojiMapping");
const cache = require("../utils/cache");

exports.getMappings = async (req, res) => {
  try {
    const mappings = await EmojiMapping.find({}, { word: 1, emoji: 1, _id: 0 });
    res.json(mappings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.addMapping = async (req, res) => {
  try {
    const { word, emoji } = req.body;

    if (!word || !emoji) {
      return res.status(400).json({ error: "Word and emoji are required" });
    }

    const mapping = await EmojiMapping.create({
      word: word.toLowerCase(),
      emoji,
    });

    // Clear translation caches when adding new mapping
    cache.clear();

    res.status(201).json(mapping);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Word already has a mapping" });
    }
    res.status(500).json({ error: error.message });
  }
};
