const public = ["admin", "employee", "guest"],
  restricted = ["admin", "employee"],
  proletariat = ["employee", "guest"],
  elite = ["admin"];

module.exports = {
  auth: {
    ascend: proletariat,
    promote: elite,
    demote: elite,
  },
  users: {
    browse: public,
    archive: restricted,
    delete: elite,
    restore: elite,
  },
};
