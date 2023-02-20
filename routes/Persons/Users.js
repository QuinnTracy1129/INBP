const router = require("express").Router(),
  {
    browse,
    find,
    update,
    destroy,
    archive,
    unresolved,
  } = require("../../controllers/Persons/Users"),
  { protect } = require("../../middleware");

router
  .get("/", protect, browse)
  .get("/archive", protect, archive)
  .get("/unresolved", protect, unresolved)
  .get("/:id/find", protect, find)
  .put("/:id/update", protect, update)
  .delete("/:id/destroy", protect, destroy);

module.exports = router;
