
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





// TODO: write your REST handlers here

let port = 3000;
app.listen(port);
console.log("Server running at: http://localhost:"+port);
