var express = require('express');
var router = express.Router();
var flash = require("connect-flash");
router.use(flash());

router.get('/logout', function(req, res) {
  req.flash("success","You have successfully logged out");
  res.render("landing.ejs",{loggedinUser:false, message: req.flash("success")});
  req.session.destroy();
});

module.exports = router;