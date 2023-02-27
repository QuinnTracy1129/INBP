const router = require("express").Router(),
  browseController = require("../controllers/Histories/browse"),
  findController = require("../controllers/Histories/find"),
  ExpressCallback = require("../middleware/expressCallback"),
  verify = require("../middleware/verify");

router
  .get("/", verify, ExpressCallback(browseController))
  .get("/:data/find", verify, ExpressCallback(findController));

module.exports = router;
