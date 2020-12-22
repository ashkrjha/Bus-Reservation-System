const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

var session = require('express-session');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(__dirname + '/public'));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "buses"
});

app.use(session({ 
    secret: '123456cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }));

// const db=require('./database');

function isloggedIn(req,res,next){
    if(req.session.loggedinUser){
        return next();
    }
    res.redirect("/login");
}


app.get("/", (req, res) => {
    var loggedinUser = req.session.loggedinUser;
    res.render("landing.ejs",{loggedinUser:loggedinUser});
    
});

app.post("/bus", (req, res) => {

    let source = req.body.source;
    let destination = req.body.destination;
    var loggedinUser = req.session.loggedinUser;
    let query = `SELECT * FROM bus WHERE bus.rid IN(SELECT rid from route where src="${source}" and dest="${destination}")`;
    
    db.query(query, (err, results) => {
        if (err) throw err;
        // console.log(results);
        res.render("bus.ejs", { results, source, destination, loggedinUser});
    });
});

app.get("/bus/:id", (req, res) => {
    var loggedinUser = req.session.loggedinUser;
    let sql = `SELECT * FROM bus WHERE bus.bid= ${req.params.id}`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.render('show',  { results ,loggedinUser});

    })
});


app.post("/bus/:id", (req, res) =>{

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
        let query=db.query(sql3,data,(err,result2)=>{
            if(err) throw err; 
            res.render('ticket',{data,result1,name,age,gender,loggedinUser});
        });
    });
      
});

app.get("/bus/:id/new", isloggedIn, (req, res) => {
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

db.connect((err) => {
    if (err) {
        console.log("Not connected!");
        throw err;
    }
    console.log("Connected");
});



// var registrationRouter = require('./routes/registration');
// app.use('/', registrationRouter);
// var loginRouter = require('./routes/login');
// app.use('/', loginRouter);
// var dashboardRouter = require('./routes/dashboard');
// app.use('/', dashboardRouter);
// var logoutRouter = require('./routes/logout');
// app.use('/', logoutRouter);





/*===========================================================================================*/

app.get('/dashboard', function(req, res, next) {
    let sql = `SELECT * FROM ticket WHERE email_address="${req.session.emailAddress}"`;
    let sql2 = `SELECT * FROM registration WHERE email_address="${req.session.emailAddress}"`
    const loggedinUser=req.session.loggedinUser;
     
    if(req.session.loggedinUser){
        db.query(sql2,(err1,results2)=>{
            if(err1)
            throw err1;
            db.query(sql,(err,results)=>{
                if(err)
                    throw err;
                res.render('dashboard',{results:results,loggedinUser, result2:result2});
            } );
        })
       
       
    }else{
        res.redirect('/login');
    }
});

app.get('/login', function(req, res, next) {
    res.render('login-form');
  });
  
app.post('/login', function(req, res){
      var emailAddress = req.body.email_address;
      var password = req.body.password;
  
      var sql='SELECT * FROM registration WHERE email_address =? AND password =?';
      db.query(sql, [emailAddress, password], function (err, data, fields) {
          if(err) throw err
          if(data.length>0){
              req.session.loggedinUser= true;
              req.session.emailAddress= emailAddress;
              res.redirect('/dashboard');
          }else{
              res.render('login-form',{alertMsg:"Your Email Address or password is wrong"});
          }
      })
  
});

app.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/');
});

app.get('/register', function(req, res, next) {
    res.render('registration-form');
  });
  
  // to store user input detail on post request
  app.post('/register', function(req, res, next) {
      
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
   if(err) throw err
   if(data.length>1){
       var msg = inputData.email_address+ "was already exist";
   }else if(confirm_password != inputData.password){
      var msg ="Password & Confirm Password is not Matched";
   }else{
       
      // save users data into database
  var sql = `INSERT INTO registration SET ?`;
  db.query(sql, inputData, function (err, data) {
      if (err) throw err;
      });
      var msg ="Your are successfully registered";
      }
   res.render('registration-form',{alertMsg:msg});
  })
       
});
/*===========================================================================================*/

app.listen(3000, () => {
    console.log("Connected to Port 3000");
});
