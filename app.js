const express = require("express");
const path = require("path");
const projects = require("./data.json");

const app = express();

app.set("view engine", "pug");
app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.render("index", projects));
app.get("/about", (req, res) => res.render("about"));

//project data
const projectsRoute = require("./routes/projects");
app.use("/projects", projectsRoute);


// 404 error handler
app.use((req, res, next) => {
  const err = new Error("Sorry, the page you're looking for doesn't exist");
  err.status = 404;
  next(err);
});


// global error handler
app.use((err, req, res, next) => {
  // uses a message that exists already on the error object or offers an alternative for untracked internal errors
  const message = err.message || "Internal server error";
  const status = err.status || 500;
  res.status(status);
  res.locals = { message, status };
  if (status === 404) return res.render("page-not-found");
  console.error(err)
  res.render("error");
});

// setting the port with this conditional lets me host on Heroku and repl.it
let port = process.env.PORT ?? 3000;
app.listen(port, () => console.log(`Server is istening on port ${port}`));
