var express = require('express');
var router = express.Router();
var db=require('../database');
var flash = require("connect-flash");
router.use(flash());


router.get('/login', function(req, res, next) {
    const loggedinUser = req.session.loggedinUser;
    res.render('login-form', {loggedinUser:loggedinUser, message: req.flash("error")});
});
  
router.post('/login', function(req, res){
    var emailAddress = req.body.email_address;
    var password = req.body.password;
    var loggedinUser=false;

    var sql='SELECT * FROM registration WHERE email_address =? AND password =?';
    db.query(sql, [emailAddress, password], function (err, data, fields) {
        if(err) throw err;
        if(data.length>0){
            req.session.loggedinUser= true;
            req.session.emailAddress= emailAddress;
            res.redirect('/dashboard');
        }else{
            res.render('login-form',{message:"Your Email Address or password is wrong",loggedinUser:loggedinUser});
        }
    });
});

module.exports = router;