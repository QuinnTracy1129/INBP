const router = require("express").Router(),
  { browse, find, save, update, destroy } = require("../controllers/Tasks"),
  { protect } = require("../middleware");

router
  .get("/", browse)
  .get("/:id/find", find)
  .post("/save", save)
  .put("/:id/update", update)
  .delete("/:id/destroy", destroy);

module.exports = router;
