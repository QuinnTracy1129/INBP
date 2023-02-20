const router = require("express").Router(),
  { find, logout } = require("../../controllers/Persons/Attendances"),
  { protect } = require("../../middleware");

router.get("/:id/find", protect, find).get("/:id/logout", protect, logout);

module.exports = router;
