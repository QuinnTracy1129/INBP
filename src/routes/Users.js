const router = require("express").Router(),
  browseController = require("../controllers/Users/browse"),
  archiveController = require("../controllers/Users/archive"),
  restoreController = require("../controllers/Users/restore"),
  destroyController = require("../controllers/Users/destroy"),
  ExpressCallback = require("../middleware/expressCallback"),
  auth = require("../middleware/auth");

router
  .get("/", auth, ExpressCallback(browseController))
  .get("/archive", auth, ExpressCallback(archiveController))
  .put("/:id/restore", auth, ExpressCallback(restoreController))
  .delete("/:id/destroy", auth, ExpressCallback(destroyController));

module.exports = router;
