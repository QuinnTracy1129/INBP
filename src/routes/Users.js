const router = require("express").Router(),
  browseController = require("../controllers/Users/browse"),
  //   registerController = require("../controllers/Auth/register"),
  ExpressCallback = require("../middleware/expressCallback"),
  auth = require("../middleware/auth");

router.get("/", auth, ExpressCallback(browseController));
//   .get("/archive", auth, ExpressCallback(loginController))
//   .delete("/:id/destroy", auth, ExpressCallback(registerController));

module.exports = router;
