const router = require("express").Router(),
  { login, register } = require("../../controllers/Persons/Auth");

router.get("/login", login).post("/register", register);

module.exports = router;
