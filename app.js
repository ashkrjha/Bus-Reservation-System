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
    password: "polynomials",
    database: "buses"
});

app.get("/", (req, res) => {
    res.render("landing.ejs");
});

app.post("/bus", (req, res) => {

    let source = req.body.source;
    let destination = req.body.destination;

    let sql = `SELECT name, bid FROM bus WHERE bus.rid IN(SELECT rid from route where src="${req.body.source}" and dest="${req.body.destination}")`;
    let query = db.query(sql, (err, results) => {
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

app.get("/bus/:id/new", (req, res) => {
    res.send("Okay, book now!");
})

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
