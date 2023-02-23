const router = require("express").Router(),
  //   browseController = require("../controllers/Users/browse"),
  //   archiveController = require("../controllers/Users/archive"),
  //   findController = require("../controllers/Users/archive"),
  createController = require("../controllers/Tasks/create"),
  updateController = require("../controllers/Tasks/update"),
  restoreController = require("../controllers/Tasks/restore"),
  destroyController = require("../controllers/Tasks/destroy"),
  ExpressCallback = require("../middleware/expressCallback"),
  auth = require("../middleware/auth");

router
  //   .get("/", auth, ExpressCallback(browseController))
  //   .get("/archive", auth, ExpressCallback(archiveController))
  //   .get("/:id/find", auth, ExpressCallback(findController))
  .post("/create", auth, ExpressCallback(createController))
  .put("/:id/update", auth, ExpressCallback(updateController))
  .put("/:id/restore", auth, ExpressCallback(restoreController))
  .delete("/:id/destroy", auth, ExpressCallback(destroyController));

module.exports = router;
