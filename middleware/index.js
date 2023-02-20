const jwt = require("jsonwebtoken"),
  User = require("../models/Persons/Users");

exports.protect = (req, res, proceed) => {
  let token = req.headers.authorization;

  if (!token) {
    res.status(401).json("Not authorized, no token");
  } else {
    if (token.startsWith("QTracy")) {
      // decode token
      jwt.verify(
        token.split(" ")[1],
        process.env.JWT_SECRET,
        async (error, response) => {
          if (error && error.name) {
            res.status(401).json({ expired: "Not authorized, token expired" });
          } else {
            if (await User.findById(response.id)) {
              proceed();
            } else {
              res
                .status(401)
                .json({ expired: "Not authorized, invalid access" });
            }
          }
        }
      );
    } else {
      res.status(401).json({ error: "Not authorized, invalid token" });
    }
  }
};

exports.notFound = (req, res, proceed) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(400);
  proceed(error);
};

exports.errorHandler = (err, req, res, proceed) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
