const router = require("express").Router(),
  browseController = require("../controllers/Files/browse"),
  ExpressCallback = require("../middleware/expressCallback"),
  verify = require("../middleware/verify");

router.get("/browse", verify, ExpressCallback(browseController));

module.exports = router;
