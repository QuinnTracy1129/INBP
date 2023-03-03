const router = require("express").Router(),
  browseController = require("../controllers/Contracts/browse"),
  findController = require("../controllers/Contracts/find"),
  createOrUpdateController = require("../controllers/Contracts/createOrUpdate"),
  ExpressCallback = require("../middleware/expressCallback"),
  verify = require("../middleware/verify");

router
  .get("/browse", verify, ExpressCallback(browseController))
  .get("/find", verify, ExpressCallback(findController))
  .put("/createOrUpdate", verify, ExpressCallback(createOrUpdateController));

module.exports = router;
