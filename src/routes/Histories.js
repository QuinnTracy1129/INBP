const router = require("express").Router(),
  browseController = require("../controllers/Histories/browse"),
  findController = require("../controllers/Histories/find"),
  ExpressCallback = require("../middleware/expressCallback"),
  verify = require("../middleware/verify");

router
  .get("/browse", verify, ExpressCallback(browseController))
  .get("/find", verify, ExpressCallback(findController));

module.exports = router;
