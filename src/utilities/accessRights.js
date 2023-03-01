const public = ["admin", "employee", "guest"],
  restricted = ["admin", "employee"],
  proletariat = ["employee", "guest"],
  elite = ["admin"];

module.exports = {
  users: {
    browse: public,
    archive: restricted,
    delete: elite,
    restore: elite,
  },
  auth: {
    ascend: proletariat,
    promote: elite,
    demote: elite,
  },
};
