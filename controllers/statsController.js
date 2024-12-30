const EmojiMapping = require("../models/EmojiMapping");
const Translation = require("../models/Translation");

// Get translation history
exports.getHistory = async (req, res) => {
  try {
    const history = await Translation.find({}, "-__v")
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      success: true,
      data: history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch history",
    });
  }
};

// Get usage statistics
exports.getStats = async (req, res) => {
  try {
    const totalTranslations = await Translation.countDocuments();
    const mappingStats = await EmojiMapping.find({}, "word emoji usageCount");

    res.json({
      success: true,
      data: {
        totalTranslations,
        mappingStats,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch statistics",
    });
  }
};
