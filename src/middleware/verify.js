const jwt = require("jsonwebtoken"),
  UserModel = require("../models/Users"),
  { accessRights } = require("../utilities");

module.exports = (req, res, proceed) => {
  let token = req.headers.authorization;

  if (!token) {
    res.status(401).json("Not authorized, no token");
  } else {
    if (token.startsWith("Bearer")) {
      // decode token
      jwt.verify(
        token.split(" ")[1],
        process.env.JWT_SECRET,
        async (error, response) => {
          if (error && error.name) {
            res.status(401).json({ expired: "Not authorized, token expired" });
          } else {
            const _user = await UserModel.findById(response.id);
            if (_user) {
              const _base = req.baseUrl.slice(1, req.baseUrl.length);
              const _path = req.path.slice(1, req.path.length);

              const _access = accessRights[_base][_path];

              if (_access.includes(_user.role.access)) {
                proceed();
              } else {
                res
                  .status(403)
                  .json({ expired: "Not authorized, invalid access" });
              }
            } else {
              res.status(403).json({ expired: "Not authorized, invalid user" });
            }
          }
        }
      );
    } else {
      res.status(401).json({ error: "Not authorized, invalid token" });
    }
  }
};
