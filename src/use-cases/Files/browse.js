const FileModel = require("../../models/Files"),
  UserModel = require("../../models/Users"),
  jwt = require("jsonwebtoken");

module.exports = req => {
  let token = req.headers.authorization;

  return jwt.verify(
    token.split(" ")[1],
    process.env.JWT_SECRET,
    async (error, response) => {
      if (error && error.name) {
        return {
          expired: "Not authorized, token expired!",
          statusCode: 401,
        };
      } else {
        const _user = await UserModel.findById(response.id);

        if (_user) {
          return FileModel.find()
            .then(files => ({
              success: files.filter(file => {
                const power =
                  _user.role.access === "admin"
                    ? 2
                    : _user.role.access === "employee"
                    ? 1
                    : 0;

                const filePower =
                  file.access === "public"
                    ? 0
                    : file.access === "restricted"
                    ? 1
                    : 2;

                if (filePower <= power) {
                  file.access = undefined;
                  return file;
                }
              }),
              statusCode: 200,
            }))
            .catch(error => ({ error: error.message, statusCode: 400 }));
        } else {
          return {
            expired: "Not authorized, invalid user!",
            statusCode: 403,
          };
        }
      }
    }
  );
};
