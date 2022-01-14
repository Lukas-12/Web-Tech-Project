
const { Pool } = require('pg');

let cfg = require('./config.json')

let express = require('express');
let cors = require('cors')
const app = express();
app.use(express.static('public'));
app.use(cors());

const pool = require('./pool.js');


let bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send("Project WebTec");
});

//Get all available items
app.get("/itemsToOrder", (req, res) => {
   pool.query("select * from items i where i.status = 'available'").then(db => res.status(200).json(db.rows))
       .catch(dberr => res.status(400).send("Database error"))

});

//Get specific item with id
app.get("/itemsToOrder/:id", (req, res) => {
    let id = req.params.id;
    pool.query('SELECT * from items where itemid = $1', [id]).then(db => {
        res.status(200).send(db.rows)

    })
        .catch(dberr => res.status(400).send("Database error"))
});

//Get all reviews
app.get("/reviews", (req, res) => {
    pool.query("select * from reviews ").then(db => res.status(200).json(db.rows))
        .catch(dberr => res.status(400).send("Database error"))

});



let port = 3000;
app.listen(port);
console.log("Server running at: http://localhost:"+port);
