const EmojiMapping = require("../models/EmojiMapping");
const Translation = require("../models/Translation");

exports.getStats = async (req, res) => {
  try {
    const totalTranslation = await Translation.countDocuments();
    const emojiUsage = await EmojiMapping.find(
      {},
      { word: 1, emoji: 1, _id: 0 }
    );
    res.json({ totalTranslation, emojiUsage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getHistory = async (req, res) => {
  try {
    const history = await Translation.find()
      .sort({ timestamp: -1 })
      .limit(10)
      .select(-__v);

    res.json({ history });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
