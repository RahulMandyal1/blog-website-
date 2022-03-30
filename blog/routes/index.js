const express = require("express");
const router = express.Router();

// All the stand alone routes are here
/* GET home page. */

router.get("/", (req, res) => {
   return res.render("index");
});
module.exports = router;
