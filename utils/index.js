exports.generateRandomChars = (length = 5) => {
  return (Math.random() + 1).toString(36).substring(2, 2 + length);
};

exports.slugify = (string) => {
  return string.trim().replace(/\s+/g, "-");
};
