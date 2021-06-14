const express = require("express");
//const request = require("request");
//const https = require("https");
const port = process.env.PORT || 3000;

//const { response } = require("express");
var app = express();
var items = ["Buy Vegitables", "Play cricked", "Work on project"];
var workList = [];
app.set("view engine", "ejs");
//uncomment when you will provide the css file
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  var day = today.toLocaleDateString("en-US", options);
  res.render("list", { listTitle: day, listItem: items });
});

app.post("/", function (request, response) {
  console.log(request.body);
  var item = request.body.newItem;
  if (request.body.list === "Work") {
    workList.push(item);
    response.redirect("/work");
  } else {
    items.push(item);
    response.redirect("/");
  }
});
app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", listItem: workList });
});
app.post("/work", function (req, res) {
  let item = req.body.newItem;
  workList.push(item);
  res.redirect("/work");
});
app.listen(port, function () {
  console.log("Server is running on port 3000");
});
