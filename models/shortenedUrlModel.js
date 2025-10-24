const mongoose = require("mongoose");

const shortenedUrlSchema = new mongoose.Schema({
  customName: {
    type: String,
    unique: true, // Ensure custom names are unique
    sparse: true, // Allow null (empty) values for custom names
    minlength: [5, "Custom name `{VALUE}` must be at least 5 characters"]
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true
  },
  originalUrl: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Url = mongoose.model("Url", shortenedUrlSchema);

module.exports = Url;
