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
  .post("/create", verify, ExpressCallback(createController))
  .get("/browse", verify, ExpressCallback(browseController))
  .get("/archive", verify, ExpressCallback(archiveController))
  .get("/find", verify, ExpressCallback(findController))
  .put("/update", verify, ExpressCallback(updateController))
  .get("/submit", verify, ExpressCallback(submitController))
  .put("/restore", verify, ExpressCallback(restoreController))
  .delete("/destroy", verify, ExpressCallback(destroyController));

module.exports = router;
