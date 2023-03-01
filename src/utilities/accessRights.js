module.exports = {
  users: {
    browse: ["admin", "employee", "guest"],
    archive: ["admin", "employee"],
    delete: ["admin"],
    restore: ["admin"],
  },
  auth: {
    ascend: ["employee", "guest"],
  },
};
