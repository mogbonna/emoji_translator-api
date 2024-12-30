const EmojiMapping = require("../models/EmojiMapping");
const cache = require("../utils/cache");

exports.getMappings = async (req, res) => {
  try {
    const mappings = await EmojiMapping.find({}, "-__v");
    res.json({
      success: true,
      data: mappings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch mappings",
    });
  }
};

exports.addMapping = async (req, res) => {
  try {
    const { word, emoji } = req.body;

    if (!word || !emoji) {
      return res.status(400).json({
        success: false,
        error: "Word and emoji are required",
      });
    }

    const newMapping = await EmojiMapping.create({
      word: word.toLowerCase(),
      emoji,
    });

    res.status(201).json({
      success: true,
      data: newMapping,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "This word already has a mapping",
      });
    }
    res.status(500).json({
      success: false,
      error: "Failed to add mapping",
    });
  }
};
