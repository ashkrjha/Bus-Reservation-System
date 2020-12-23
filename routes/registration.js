var express = require('express');
var router = express.Router();
var db=require('../database');

router.get('/register', function(req, res, next) {
    let loggedinUser = req.session.loggedinUser;
    res.render('registration-form',{loggedinUser:loggedinUser});
});
  
// to store user input detail on post request
router.post('/register', function(req, res, next) {
    let loggedinUser = req.session.loggedinUser;
    inputData ={
        email_address: req.body.email_address,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        password: req.body.password
    }
    const confirm_password=req.body.confirm_password;
    // check unique email address
    // var sql=`SELECT * FROM registration WHERE email_address = "${inputData.email_address}"`;
    var sql=`SELECT * FROM registration WHERE email_address = ?`;
    db.query(sql, [inputData.email_address] ,function (err, data, fields) {
        if(err)
            throw err
        if(data.length>=1){
            var msg = inputData.email_address +" " + " already exist ";
        }else if(confirm_password != inputData.password){
            var msg ="Password & Confirm Password Does Not Match";
        }else{
            // save users data into database
            var sql = `INSERT INTO registration SET ?`;
            db.query(sql, inputData, function (err, data) {
                if (err) throw err;
            });
            var msg ="Your are successfully registered";
        }
        res.render('registration-form',{alertMsg:msg, loggedinUser:loggedinUser});
    });   
});

module.exports = router;