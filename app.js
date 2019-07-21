let express = require("express");
let path = require("path");
let exphbs = require("express-handlebars");
let models = require("./models");
let Response = models;
let mongoose = require("mongoose");

//setting up handlebars
let app = express();
app.set("views", path.join(__dirname, "views"));
app.engine("hbs", exphbs({ extname: "hbs", defaultLayout: "main.hbs" }));
app.set("view engine", "hbs");

var bodyParser = require("body-parser");
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser({ extended: true }));
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.render("home");
});
app.get("/contact", function(req, res) {
  res.render("contact", { title: "Contact Me" });
});
app.post("/contact", function(req, res) {
  console.log(req.body);
  let name = req.body.name;
  let email = req.body.email;
  let message = req.body.message;
  let response = new Response({
    name: name,
    email: email,
    message: message
  });
  console.log(response);
  response
    .save()
    .then(response => {
      console.log(response);
      res.send("/contact", { message: "Successfully sent!" });
    })
    .catch(err => {
      console.log(err);
    });
});
app.get("/interests", function(req, res) {
  res.render("interests", { title: "Interests and Hobbies" });
});
app.get("/testimony", function(req, res) {
  res.render("testimony");
});
//Setting the port!!!
var PORT = process.env.PORT || 8000;
app.listen(PORT, function(error) {
  error
    ? console.error(error)
    : console.info(
        `==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`
      );
});

module.exports = app;
