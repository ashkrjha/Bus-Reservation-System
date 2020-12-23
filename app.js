const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const flash = require("connect-flash");
app.use(flash());
var db=require('./database');

var session = require('express-session');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(__dirname + '/public'));

app.use(session({ 
    secret: '123456cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

app.get("/", (req, res) => {
    var loggedinUser = req.session.loggedinUser;
    res.render("landing.ejs",{loggedinUser:loggedinUser, message:""});
    
});

var busRouter = require('./routes/bus');
app.use('/', busRouter);
var registrationRouter = require('./routes/registration');
app.use('/', registrationRouter);
var loginRouter = require('./routes/login');
app.use('/', loginRouter);
var dashboardRouter = require('./routes/dashboard');
app.use('/', dashboardRouter);
var logoutRouter = require('./routes/logout');
app.use('/', logoutRouter);

app.get('/*', function(req,res,next) {
    req.session.flash = [];
    next();
});

app.listen(3000, () => {
    console.log("Connected to Port 3000");
});