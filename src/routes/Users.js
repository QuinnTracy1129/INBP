const router = require("express").Router(),
  browseController = require("../controllers/Users/browse"),
  archiveController = require("../controllers/Users/archive"),
  restoreController = require("../controllers/Users/restore"),
  destroyController = require("../controllers/Users/destroy"),
  ExpressCallback = require("../middleware/expressCallback"),
  verify = require("../middleware/verify");

router
  .get("/browse", verify, ExpressCallback(browseController))
  .get("/archive", verify, ExpressCallback(archiveController))
  .put("/restore", verify, ExpressCallback(restoreController))
  .delete("/destroy", verify, ExpressCallback(destroyController));

module.exports = router;
