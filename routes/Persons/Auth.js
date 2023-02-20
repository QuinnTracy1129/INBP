const router = require("express").Router(),
  { login, save } = require("../../controllers/Persons/Auth");

router.get("/login", login).post("/save", save);

module.exports = router;
