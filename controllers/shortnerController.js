const Url = require("../models/shortenedUrlModel");

const { generateRandomChars, slugify } = require("../utils");

exports.createUrl = async (req, res) => {
  try {
    const { url, customName } = req.body;
    const randomChar = generateRandomChars(5);
    const shortUrl = `https://shortit/${
      customName ? slugify(customName.trim()) : randomChar
    }`;

    // find if original url exsit in data base and return with the short url
    const urlInDB = await Url.findOne({ originalUrl: url });
    if (urlInDB) {
      return res.status(200).json({
        message: "Url already exists",
        data: urlInDB
      });
    }

    const newUrl = await Url.create({
      shortUrl,
      originalUrl: url,
      customName: customName ? customName.trim() : null
    });

    res.status(200).json({
      message: "Url shortened sucessfully",
      data: {
        id: newUrl._id,
        shortUrl: newUrl.shortUrl
      }
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};
