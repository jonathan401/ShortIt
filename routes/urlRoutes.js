const express = require("express");
const urlController = require("../controllers/urlController");

const router = express.Router();

router.route("/").get(urlController.getUrls);
router
  .route("/:id")
  .get(urlController.getUrl)
  .patch(urlController.updateUrl)
  .delete(urlController.deleteUrl);

module.exports = router;
