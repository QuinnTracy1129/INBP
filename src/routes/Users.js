const router = require("express").Router(),
  loginController = require("../controllers/Auth/login"),
  registerController = require("../controllers/Auth/register"),
  ExpressCallback = require("../middleware/expressCallback"),
  auth = require("../middleware/auth");

router
  .get("/", auth, ExpressCallback(loginController))
  .get("/archive", auth, ExpressCallback(loginController))
  .delete("/:id/destroy", auth, ExpressCallback(registerController));

module.exports = router;
