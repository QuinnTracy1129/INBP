const router = require("express").Router(),
  browseController = require("../controllers/Clients/browse"),
  findController = require("../controllers/Clients/find"),
  createOrUpdateController = require("../controllers/Clients/createOrUpdate"),
  ExpressCallback = require("../middleware/expressCallback"),
  verify = require("../middleware/verify");

router
  .get("/browse", verify, ExpressCallback(browseController))
  .get("/find", verify, ExpressCallback(findController))
  .put("/createOrUpdate", verify, ExpressCallback(createOrUpdateController));

module.exports = router;
