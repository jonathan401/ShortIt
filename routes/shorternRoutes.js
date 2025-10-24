const express = require("express");
const shortnerController = require("../controllers/shortnerController");

const router = express.Router();

router.route("/").post(shortnerController.createUrl);

module.exports = router;
