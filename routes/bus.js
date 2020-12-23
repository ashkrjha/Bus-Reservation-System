var express = require('express');
var router = express.Router();
var db=require('../database');
const mysql = require("mysql");

router.post("/bus", (req, res) => {

    let source = req.body.source;
    let destination = req.body.destination;
    var loggedinUser = req.session.loggedinUser;
    let query = `SELECT * FROM bus WHERE bus.rid IN(SELECT rid from route where src="${source}" and dest="${destination}")`;
    
    db.query(query, (err, results) => {
        if (err)
            throw err;
        res.render("bus.ejs", { results, source, destination, loggedinUser});
    });
});

router.get("/bus/:id", (req, res) => {
    var loggedinUser = req.session.loggedinUser;
    let sql = `SELECT * FROM bus WHERE bus.bid= ${req.params.id}`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.render('show',  { results ,loggedinUser});

    })
});


router.post("/bus/:id", (req, res) =>{
    //variables
    let name=req.body.name;
    let age=req.body.age;
    let gender=req.body.gender;
    let bid=req.params.id;
    let post= {bid: bid,  name: name , age: age, gender: gender};
    var loggedinUser = req.session.loggedinUser;
    var email=req.session.emailAddress;
    //Inserting into passenger table
    let sql='INSERT INTO passenger SET ?';
    db.query(sql,post,(err,result)=>{
          if(err) throw err;
    });

    //Inserting into ticket table
    let query1 = `SELECT * FROM bus WHERE bus.bid=` + bid;
    let fare=1000;
    
    let sql2=`SELECT pid FROM passenger WHERE name=name`; // SELECT pid FROM table passenger ORDER BY pid DESC LIMIT 1

    db.query(sql2,(err,results)=>{
        if(err) throw err;
       pid=results[results.length-1].pid; 
    });
   
    db.query(query1,(err,result1)=>{
        if(err) throw err;
        let data={fare:fare,rid:result1[0].rid,pid:pid,email_address:email};
        let sql3='INSERT INTO ticket SET ?';
        db.query(sql3,data,(err,result2)=>{
            if(err) throw err; 
            res.render('ticket',{data,result1,result2,name,age,gender,loggedinUser});
        });
    });
      
});

router.get("/bus/:id/new", isloggedIn, (req, res) => {
    var loggedinUser = req.session.loggedinUser;
    let query1 = `SELECT * FROM bus WHERE bus.bid= ${req.params.id}`;
    let query2 = `SELECT * FROM route WHERE route.rid IN(SELECT bus.rid FROM bus WHERE bus.bid= ${req.params.id})`;
    db.query(query1, (err, results1) => {
        db.query(query2, (err, results2) => {
            if(err)
                throw err;
            res.render('new', {results1, results2, loggedinUser});
        });
    });
});

function isloggedIn(req,res,next){
    if(req.session.loggedinUser){
        return next();
    }
    req.flash("error","Please Login First");
    res.redirect("/login");
}

module.exports = router;