const express = require("express");
const path = require("path");

const app = express();

app.set("view engine", "pug");
app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.render("index"));
app.get("/about", (req, res) => res.render("about"));

const projects = require("./routes/projects");
app.use("/projects", projects);

app.use((req, res, next) => {
  const err = new Error("Sorry, the page you're looking for doesn't exist");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  const message = err.message || "Internal server error";
  const status = err.status || 500;
  res.status(status);
  res.locals = { message, status };
  if (status === 404) return res.render("page-not-found");
  res.render("error");
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is istening on port ${port}`));
