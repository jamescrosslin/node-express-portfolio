const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "pug");
app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.render("index"));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is istening on port ${port}`));
