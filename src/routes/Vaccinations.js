const router = require("express").Router(),
  browseController = require("../controllers/Addresses/browse"),
  findController = require("../controllers/Addresses/find"),
  createController = require("../controllers/Vaccinations/create"),
  updateController = require("../controllers/Vaccinations/update"),
  ExpressCallback = require("../middleware/expressCallback"),
  verify = require("../middleware/verify");

router
  .get("/browse", verify, ExpressCallback(browseController))
  .get("/find", verify, ExpressCallback(findController))
  .post("/create", verify, ExpressCallback(createController))
  .put("/update", verify, ExpressCallback(updateController));

module.exports = router;
