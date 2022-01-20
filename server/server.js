
const { Pool } = require('pg');

let cfg = require('./config.json')

let express = require('express');
let cors = require('cors')
const app = express();
app.use(express.static('public'));
app.use(cors());
const checkAuth = require('./check_auth');
const pool = require('./pool.js');
const jwt = require('jsonwebtoken');

let bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send("Project WebTec");
});

//Get all available items
app.get("/itemsToOrder", (req, res) => {
    pool.query("select * from items i where i.status = 'available' order by i.itemid asc").then(db => res.status(200).json(db.rows))
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
app.get("/orders", checkAuth, (req, res) => {
    let token = req.headers.authorization.split(" ")[1];
    pool.query("select * from orders where paymenttoken = $1 order by orderid", [token]).then(db => res.status(200).json(db.rows))
        .catch(dberr => res.status(400).send("Database error"))
})

//Get items of an order
app.get("/orderItems/:id", (req, res) => {
    let id = req.params.id;
    pool.query("select ordereditems from orders where orderid = $1", [id]).then(db => res.status(200).json(db.rows))
        .catch(dberr => res.status(400).send("Database error"))
})

//Like an item
 app.post("/likeItem/:orderid/:itemid", checkAuth,  (req, res) => {
    let orderId = req.params.orderid;
    let itemId = req.params.itemid;
    let token = req.headers.authorization.split(" ")[1];

     pool.query("update orders"
    +" set ordereditems = ((ordereditems:: jsonb - (cast(t.idx as integer) - 1)) || jsonb_set(t.item, '{gotrated}', 'true'))"
    +" from"
    +" (Select orderid as idd, paymenttoken as tok, dat as item, idx" 
    +" from orders o, jsonb_array_elements(o.ordereditems) with ordinality as obj(dat, idx)"
    +" where o.orderid = $1 and o.paymenttoken = $2 and cast(dat ->> 'itemid' as integer) = $3"
    +") t"
        + " where orderid = t.idd and paymenttoken = t.tok", [orderId, token, itemId]).then  ( db  =>  {
              pool.query("update items set likescount = likescount + 1 where itemid = $1", [itemId]).then(db => {
                  res.status(200).send()
              })
                .catch(dberr => res.status(400).send("Database error"))
        })
})

//Dislike an item
 app.post("/dislikeItem/:orderid/:itemid",  (req, res) => {
    let orderId = req.params.orderid;
    let itemId = req.params.itemid;
    let token = req.headers.authorization.split(" ")[1];

    pool.query("update orders"
        + " set ordereditems = ((ordereditems:: jsonb - (cast(t.idx as integer) - 1)) || jsonb_set(t.item, '{gotrated}', 'true'))"
        + " from"
        + " (Select orderid as idd, paymenttoken as tok, dat as item, idx"
        + " from orders o, jsonb_array_elements(o.ordereditems) with ordinality as obj(dat, idx)"
        + " where o.orderid = $1 and o.paymenttoken = $2 and cast(dat ->> 'itemid' as integer) = $3"
        + ") t"
        + " where orderid = t.idd and paymenttoken = t.tok", [orderId, token, itemId]).then(db => {
            pool.query("update items set dislikescount = dislikescount + 1 where itemid = $1", [itemId]).then(db => res.status(200).send())
                .catch(dberr => res.status(400).send("Database error"))
        })
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

//Start, get token
app.get("/login", (req, res) => {
    const token = jwt.sign({},cfg.auth.jwt_key,{ expiresIn: cfg.auth.expiration })
    res.status(200).json(token);
});

//Submit an Order
app.post("/submitOrder", checkAuth, (req, res) => {
    let items = req.body.items;
    let table = req.body.table;
    let orderedItems = [];
    let date = new Date().toISOString().slice(0, 10)
    let reference = req.body.reference
    let token = req.headers.authorization.split(" ")[1];
    let totalAmount = 0;
    let status = "ordered";
    for(let item of items){
        totalAmount += (item.amount * item.price)
        let id = parseInt(item.itemid);
        let amount = item.amount;
        let json ={itemid: id,amount:amount,status: "ordered", gotrated:false} ;
        orderedItems.push(json);
    }

    pool.query("select MAX(orderid) FROM orders")
        .then(db =>{
            let id = db.rows[0].max;
            id++;
            const values = [id,status,date,table,reference,token,(parseInt(totalAmount * 100) / 100.0),JSON.stringify(orderedItems)];
            const query = "insert into orders (orderid,status, orderdate, tableid, paymentreference,paymenttoken,totalamount,ordereditems ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)";
            pool.query(query,values)
                .then( db => {
                    res.status(200).send();
                }).catch(dberr => res.status(400).send("Database error"))
        }).catch(dberr => res.status(400).send("Database error"))
});



let port = 3000;
app.listen(port);
console.log("Server running at: http://localhost:"+port);
