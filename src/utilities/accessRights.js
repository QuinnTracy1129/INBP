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
    destroy: elite,
    restore: elite,
  },
  tasks: {
    create: public,
    browse: public,
    archive: restricted,
    find: public,
    update: public,
    submit: public,
    destroy: elite,
    restore: elite,
  },
  histories: {
    browse: elite,
    find: elite,
  },
  addresses: {
    browse: restricted,
    find: restricted,
    createOrUpdate: restricted,
  },
  contracts: {
    browse: elite,
    find: restricted,
    createOrUpdate: elite,
  },
  clients: {
    browse: restricted,
    find: restricted,
    createOrUpdate: elite,
  },
  vaccinations: {
    browse: restricted,
    find: restricted,
    create: restricted,
  },
};
