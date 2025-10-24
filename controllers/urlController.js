const Url = require("../models/shortenedUrlModel");
const { generateRandomChars, slugify } = require("../utils");

exports.getUrls = async (req, res) => {
  try {
    const urls = await Url.find({}).sort("-createdAt");
    res.status(200).json({
      message: "Successful",
      results: urls.length,
      data: urls
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};

exports.updateUrl = async (req, res) => {
  const { customName, url } = req.body;
  let updatedFields;
  const randomChar = generateRandomChars(5);
  const shortUrl = `https://shortit/${
    customName ? slugify(customName.trim()) : randomChar
  }`;

  if (customName) {
    updatedFields = {
      customName: customName.trim(),
      shortUrl
    };
  }

  if (url) {
    updatedFields = {
      ...updatedFields,
      originalUrl: url
    };
  }

  try {
    const newUrl = await Url.findByIdAndUpdate(req.params.id, updatedFields, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      message: "Url updated successfully",
      data: newUrl
    });
  } catch (err) {
    res.status(404).json({
      message: err
    });
  }
};

exports.getUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const url = await Url.findById(id);

    res.status(200).json(url);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};

exports.deleteUrl = async (req, res) => {
  try {
    const url = await Url.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Url deleted successfully",
      data: url
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};
