const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const token = req.headers.token;
  jwt.verify(token, process.env.ACCESS_KEY, function (err, user) {
    if (err) {
      return res.status(404).json({
        errCode: -2,
        message: "User access denied",
      });
    }
    let { payload } = user;
    if (payload.isAdmin) {
      next();
    } else {
      return res.status(400).json({
        errCode: -2,
        message: "User access denied",
      });
    }
  });
};

const authUserMiddleware = (req, res, next) => {
  const token = req.headers.token;
  const userId = req.query.userId;
  jwt.verify(token, process.env.ACCESS_KEY, function (err, user) {
    if (err) {
      return res.status(404).json({
        errCode: -2,
        message: "User access denied",
      });
    }
    let { payload } = user;
    if (payload?.isAdmin || payload?.id === userId) {
      next();
    } else {
      return res.status(400).json({
        errCode: -2,
        message: "User access denied",
      });
    }
  });
};

module.exports = {
  authMiddleware,
  authUserMiddleware,
};
