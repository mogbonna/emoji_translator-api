const express = require("express");
const router = express.Router();
const translationController = require("../controllers/translationController");
const mappingController = require("../controllers/mappingController");
const statsController = require("../controllers/statsController");

router.post("/translate/to-emoji", translationController.translateToEmoji);
router.post("/translate/to-text", translationController.translateToText);
router
  .route("/mappings")
  .get(mappingController.getMappings)
  .post(mappingController.addMapping);

router.get("/stats", statsController.getStats);
router.get("/history", statsController.getHistory);

module.exports = router;
