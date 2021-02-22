const { Router } = require("express");
const router = Router();
const data = require("../data.json");

router.get("/:id", (req, res, next) => {
  res.render("project", {});
});

module.exports = router;
