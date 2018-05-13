// Require dependency
var express = require('express');
var burger = require('../models/burger.js');

var express = require("express");

var router = express.Router();


// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.all(function(data) {
    var hdbObject = {
      burgers: data
    };
    console.log(hdbObject, "controller GET");
    res.render("index", hdbObject);
  });
});

router.post("/api/burgers", function(req, res) {
  console.log(req.body.burger, "controller POST");
  burger.create([
    "burger_name", "devoured"
  ], [
    req.body.burger, 0
  ], function(result) {
    // Send back the ID of the new quote
    // res.json({ id: result.insertId });
    console.log(result);
    res.redirect("/");
  });
});

// router.post("/api/devoured", function(req, res) {
//   console.log(req.body.dev);
//   burger.update([
//     "burger_name", "devoured"
//   ], [
//     req.body.burger, req.body.devoured
//   ], function(result) {
//     // Send back the ID of the new quote
//     res.json({ id: result.insertId });
//   });
// });

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({
    devoured: req.body.devoured
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});



// router.put("/api/devour/:id", function(req, res) {
  // burger.update(req.params.id, function(result) {
    // wrapper for orm.js that using MySQL update callback will return a log to console,
    // render back to index with handle
    // console.log(result);
    // Send back response and let page reload from .then in Ajax
    // res.sendStatus(200);
  // });
// });





// Export routes for server.js to use.
module.exports = router;
