
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

// Routes for menue items
app.get("/itemsToOrder", (req, res) => {
   pool.query('SELECT * from items').then(db => res.status(200).json(db.rows))

});

app.get("/itemsToOrder/:id", (req, res) => {
    let id = req.params.id;
    pool.query('SELECT * from items where itemid = $1', [id]).then(db => {
       // res.status(200).json(db.rows)
        res.status(200).send(db.rows)
    })

});



// TODO: write your REST handlers here

let port = 3000;
app.listen(port);
console.log("Server running at: http://localhost:"+port);
