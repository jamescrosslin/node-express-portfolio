const { Router } = require("express");
const router = Router();
const { projects } = require("../data.json");

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  if (projects[+id]) {
    res.locals = projects[+id];
    return res.render("project");
  }
  next();
});

module.exports = router;
