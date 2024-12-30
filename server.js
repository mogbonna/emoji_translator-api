const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = require("./app");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => console.error("MongoDB connection error:", err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
