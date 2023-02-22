const router = require("express").Router(),
  loginController = require("../controllers/Auth/login"),
  ExpressCallback = require("../middleware/expressCallback");

router.get("/login", ExpressCallback(loginController));

module.exports = router;
