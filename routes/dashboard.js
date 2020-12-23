var express = require('express');
var router = express.Router();
var db=require('../database');

router.get('/dashboard', function(req, res, next) {
    let sql = `SELECT * FROM ticket WHERE email_address="${req.session.emailAddress}"`;
    let sql2 = `SELECT * FROM registration WHERE email_address="${req.session.emailAddress}"`;
    const loggedinUser=req.session.loggedinUser;
     
    if(req.session.loggedinUser){
        db.query(sql2,(err1,result2) =>{
            if(err1)
                throw err1;
            db.query(sql,(err2,results)=>{
                if(err2)
                    throw err2;
                res.render('dashboard',{results:results,loggedinUser:loggedinUser, result2:result2});
            } );
        })
    }else{
        res.redirect('/login');
    }
});

router.get("/bus/dashboard/:id", (req, res) => {
    var loggedinUser = req.session.loggedinUser;
    let sql = `SELECT * FROM ticket WHERE ticket.tid= ${req.params.id}`;
    let sql1=`SELECT src,dest FROM route WHERE rid in(SELECT rid FROM ticket WHERE email_address="${req.session.emailAddress}")`;
    let sql2=`SELECT * FROM passenger WHERE pid in(SELECT pid FROM ticket WHERE tid=${req.params.id})`;
 
    db.query(sql, (err1, results) => {
        if (err1) throw err1;
        db.query(sql1,(err2,results1)=>{
                if(err2)
                    throw err2;
                db.query(sql2,(err,results2)=>{
                        if(err)
                            throw err;
                        res.render('show-ticket', { results ,loggedinUser,results1,results2});
                    }); 
        });
    })
});

module.exports = router;