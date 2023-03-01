const router = require("express").Router(),
  loginController = require("../controllers/Auth/login"),
  ascendController = require("../controllers/Auth/ascend"),
  promoteController = require("../controllers/Auth/promote"),
  demoteController = require("../controllers/Auth/promote"),
  registerController = require("../controllers/Auth/register"),
  ExpressCallback = require("../middleware/expressCallback"),
  verify = require("../middleware/verify");

router
  .get("/login", ExpressCallback(loginController))
  .get("/ascend", verify, ExpressCallback(ascendController))
  .get("/promote", verify, ExpressCallback(promoteController))
  .get("/demote", verify, ExpressCallback(promoteController))
  .post("/register", ExpressCallback(registerController));

module.exports = router;
