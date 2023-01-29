const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ Unauthorized: err });
    res.locals.email = decoded.email;
    res.locals.exp = decoded.exp;
    next();
  });
};

module.exports = { auth };
