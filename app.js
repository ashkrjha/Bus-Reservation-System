const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'/views'));
app.use(express.static(__dirname + '/public'));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "polynomials",
    database: "buses"
});

app.get("/", (req, res)=>{
    res.render("landing.ejs");
});

app.post('/bus',(req,res) =>{
    const {source,destination}=req.body;
    
    res.redirect('/comments');

db.connect((err) => {
    if (err) {
        console.log("Not connected!");
        throw err;
    }
    console.log("Connected");
});

app.listen(3000, () => {
    console.log("Server running...");
});