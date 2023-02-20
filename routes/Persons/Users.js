const router = require("express").Router(),
  {
    browse,
    update,
    destroy,
    archive,
  } = require("../../controllers/Persons/Users"),
  { protect } = require("../../middleware");

router
  .get("/", protect, browse)
  .get("/archive", protect, archive)
  .put("/:id/update", protect, update)
  .delete("/:id/destroy", protect, destroy);

module.exports = router;
