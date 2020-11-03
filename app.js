const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

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

app.get("/", (req, res) => {
    res.render("landing.ejs");
});

app.post("/bus", (req, res) => {

    let source = req.body.source;
    let destination = req.body.destination;

    let query = `SELECT * FROM bus WHERE bus.rid IN(SELECT rid from route where src="${req.body.source}" and dest="${req.body.destination}")`;
    db.query(query, (err, results) => {
        if (err) throw err;
        res.render("bus.ejs", { results, source, destination });
    });
});

app.get("/bus/:id", (req, res) => {
    let sql = `SELECT * FROM bus WHERE bus.bid= ${req.params.id}`;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
        res.render('show', { results });

    })
});


app.post("/bus/:id", (req, res) =>{

    //variables
    let name=req.body.name;
    let age=req.body.age;
    let gender=req.body.gender;
    let bid=req.params.id;
    let post= {bid: bid,  name: name , age: age, gender: gender};

    //Inserting into passenger table
    let sql='INSERT INTO passenger SET ?';
    db.query(sql,post,(err,result)=>{
          if(err) throw err;
    });

    //Inserting into ticket table
    let query1 = `SELECT * FROM bus WHERE bus.bid=` + bid;
    let fare=1000;
    
    let sql2=`SELECT pid FROM passenger WHERE name=name`; // SELECT pid FROM table passenger ORDER BY pid DESC LIMIT 1;
    let pid;
    let bus;

    db.query(sql2,(err,results)=>{
        if(err) throw err;
       pid=results[results.length-1].pid; 
    });
   
    db.query(query1,(err,result1)=>{
        if(err) throw err;
        let data={fare:fare,rid:result1[0].rid,pid:pid};
        let sql3='INSERT INTO ticket SET ?';
        let query=db.query(sql3,data,(err,result2)=>{
            if(err) throw err; 
            res.render('ticket',{data,result1,name,age,gender});
        });
    });
      
});

app.get("/bus/:id/new", (req, res) => {
    let query1 = `SELECT * FROM bus WHERE bus.bid= ${req.params.id}`;
    let query2 = `SELECT * FROM route WHERE route.rid IN(SELECT bus.rid FROM bus WHERE bus.bid= ${req.params.id})`;
    db.query(query1, (err, results1) => {
        db.query(query2, (err, results2) => {
            if(err)
                throw err;
            res.render('new', {results1, results2});
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

app.listen(3000, () => {
    console.log("Connected to Port 3000");
});
