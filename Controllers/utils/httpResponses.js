// This function simply serves to standardize a very common http error response
function requestFieldMissing(res, field) {
  return res.status(400).json({ message: `missing ${field}` });
}

module.exports = { requestFieldMissing };
