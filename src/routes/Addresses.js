const router = require("express").Router(),
  browseController = require("../controllers/Addresses/browse"),
  findController = require("../controllers/Addresses/find"),
  createOrUpdateController = require("../controllers/Addresses/createOrUpdate"),
  ExpressCallback = require("../middleware/expressCallback"),
  verify = require("../middleware/verify");

router
  .get("/browse", verify, ExpressCallback(browseController))
  .get("/find", verify, ExpressCallback(findController))
  .put("/createOrUpdate", verify, ExpressCallback(createOrUpdateController));

module.exports = router;
