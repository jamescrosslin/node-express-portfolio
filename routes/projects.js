const { Router } = require("express");
const router = Router();
const { projects } = require("../data.json");

router.get("/:id", (req, res, next) => {
  res.locals = projects[0];
  res.render("project");
});

module.exports = router;
