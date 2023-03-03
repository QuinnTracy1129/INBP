const router = require("express").Router(),
  browseController = require("../controllers/Addresses/browse"),
  findController = require("../controllers/Addresses/find"),
  createController = require("../controllers/Vaccinations/create"),
  ExpressCallback = require("../middleware/expressCallback"),
  verify = require("../middleware/verify");

router
  .get("/browse", verify, ExpressCallback(browseController))
  .get("/find", verify, ExpressCallback(findController))
  .post("/create", verify, ExpressCallback(createController))
  .put("/update", verify, ExpressCallback(createController));

module.exports = router;
