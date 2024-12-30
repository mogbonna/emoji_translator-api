const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");
const { mappings } = require("./data/defaultMappings");
const EmojiMapping = require("./models/EmojiMapping");

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => console.error("MongoDB connection error:", err));

const initailizeDefaultMappings = async () => {
  try {
    const count = await EmojiMapping.countDocuments();
    if (count === 0) {
      await EmojiMapping.insertMany(mappings);
      console.log("Default mapping initialized");
    }
  } catch (error) {
    console.error("Error initializing default mappings:", error);
  }
};

mongoose.connection.once("open", () => {
  initailizeDefaultMappings();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
