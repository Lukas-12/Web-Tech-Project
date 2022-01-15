
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

//Get all orders
app.get("/orders", (req, res) => { //token has to be checked first...ugh
    pool.query("select * from orders").then(db => res.status(200).json(db.rows))
        .catch(dberr => res.status(400).send("Database error"))
})

//Get items of an order
app.get("/orderItems/:id", (req, res) => {
    let id = req.params.id;
    pool.query("select ordereditems from orders where orderid = $1", [id]).then(db => res.status(200).json(db.rows))
        .catch(dberr => res.status(400).send("Database error"))
})

//Create a review
app.post("/reviews", (req, res) => {
    let username = req.body.username;
    let date = new Date().toISOString().slice(0, 10)
    let desc = req.body.description;

    pool.query("select MAX(reviewid) FROM reviews")
        .then(db =>{
            let id = db.rows[0].max;
            id++;
            const values = [id,username,date,desc];
            const query = "insert into reviews (reviewid,username, date, description) VALUES ($1,$2,$3,$4)";
            pool.query(query,values)
                .then( db => {
                    res.status(200).json(db.rows);
            })
        }).catch(dberr => res.status(400).send("Database error"))



});



let port = 3000;
app.listen(port);
console.log("Server running at: http://localhost:"+port);
