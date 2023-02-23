const router = require("express").Router(),
  loginController = require("../controllers/Auth/login"),
  registerController = require("../controllers/Auth/register"),
  ExpressCallback = require("../middleware/expressCallback");

router
  .get("/login", ExpressCallback(loginController))
  .post("/register", ExpressCallback(registerController));

module.exports = router;
