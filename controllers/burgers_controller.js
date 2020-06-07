const express = require("express");
// Import the model (burger.js) to use its database functions.
const burger = require("../models/burger.js");

const router = express.Router();


// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
  // console.log("Request ", req );
  burger.all(function (data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burger", function (req, res) {
  burger.create("burger_name", [req.body.burger_name], function (result) {
    res.json({ id: result.insertId });
  });
  //Not needed??
  // ], [
  //   req.body.burger_name, req.body.devoured
  // ], function (result) {
  //   res.json({ id: result.insertId });
  //   res.redirect("/burgers");
  // });
});

router.put("/api/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({
    devoured: req.body.devoured
  }, condition, function (result) {
    if (result.changedRows == 0) {

      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// router.delete("/api/burgers/:id", function (req, res) {
//   var condition = "id = " + req.params.id;

//   burger.delete(condition, function(result) {
//     if (result.affectedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });
// Export routes for server.js to use.
module.exports = router;
