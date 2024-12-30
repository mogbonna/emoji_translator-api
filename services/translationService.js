const EmojiMapping = require("../models/EmojiMapping");

exports.translateToEmoji = async (text) => {
  const mappings = await EmojiMapping.find();
  const mappingDict = Object.fromEntries(
    mappings.map((m) => [m.word, m.emoji])
  );
  const words = text.toLowerCase().split(/\s+/);
  const translated = words.map((word) => {
    const cleanWord = word.replace(/[.,!?]$/, "");
    if (mappingDict[cleanWord]) {
      EmojiMapping.updateOne(
        { word: cleanWord },
        { $inc: { usageCount: 1 } }
      ).exec();
      return mappingDict[cleanWord];
    }
    return word;
  });
  return translated.join(" ");
};

exports.translateToText = async (emojiSequence) => {
  const mappings = await EmojiMapping.find();
  const reverseDict = Object.fromEntries(
    mappings.map((m) => [m.emoji, m.word])
  );
  const emojis = emojiSequence.split(/\s+/);
  const translated = emojis.map((emoji) => {
    if (reverseDict[emoji]) {
      EmojiMapping.updateOne({ emoji }, { $inc: { usageCount: 1 } }).exec();
      return reverseDict[emoji];
    }
    return emoji;
  });
  return translated.join(" ");
};
