const router = require("express").Router(),
  browseController = require("../controllers/Tasks/browse"),
  archiveController = require("../controllers/Tasks/archive"),
  findController = require("../controllers/Tasks/find"),
  createController = require("../controllers/Tasks/create"),
  updateController = require("../controllers/Tasks/update"),
  submitController = require("../controllers/Tasks/submit"),
  restoreController = require("../controllers/Tasks/restore"),
  destroyController = require("../controllers/Tasks/destroy"),
  ExpressCallback = require("../middleware/expressCallback"),
  verify = require("../middleware/verify");

router
  .get("/", verify, ExpressCallback(browseController))
  .get("/archive", verify, ExpressCallback(archiveController))
  .get("/:userId/find", verify, ExpressCallback(findController))
  .get("/:id/submit", verify, ExpressCallback(submitController))
  .post("/create", verify, ExpressCallback(createController))
  .put("/:id/update", verify, ExpressCallback(updateController))
  .put("/:id/restore", verify, ExpressCallback(restoreController))
  .delete("/:id/destroy", verify, ExpressCallback(destroyController));

module.exports = router;
