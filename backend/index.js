import express from "express"
import mysql from "mysql"
import cors from "cors"

//initializes our node express application!
const app = express()

//establish a connection with the locally hosted database
const db = mysql.createConnection({
    host:"192.168.56.12",
    port:"3306",
    user:"webuser",
    password: "insecure_db_pw",
    database: "HEMA_SK",
    authPlugin: 'caching_sha2_password' // Specify the authentication plugin
})

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database!");
  });

//If there is an authentication problem:
// ALTER USER 'root'@'localhost; IDENTIFIED WITH mysql_native_password BY 'password';

app.use(express.json())
app.use(cors())

//function to test that a connection is successful
app.get("/", (req,res)=>{
    res.json("Hello! This is the backend.")
})

//functions for retrieving all fencers from the database
app.get("/fencers", (req,res)=>{
    const q = "SELECT * FROM fencers"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

//functions for adding a new fencer into the database
app.post("/fencers", (req,res)=>{
    const q = "INSERT INTO fencers (`score`,`name`,`club`,`weapon`) VALUES (?)"
    const values = [
        req.body.score,
        req.body.name,
        req.body.club,
        req.body.weapon
    ]

    db.query(q, [values], (err, data)=>{
        if (err) return res.json(err);
        return res.json("Fencer has been added successfully.");
    })
})

//function to delete a fencer fron the database
app.delete("/fencers/:id", (req,res)=>{
    const fencerId = req.params.id;
    const q = "DELETE FROM fencers WHERE id = ?"

    db.query(q, [fencerId], (err, data)=>{
        if (err) return res.json(err);
        return res.json("Fencer deleted successfully.");
    })
})

//function for updating the values of a certain fencer in the database
app.put("/fencers/:id", (req,res)=>{
    const fencerId = req.params.id;
    const q = "UPDATE fencers SET `name` = ?, `club` = ?, `weapon` = ?, `score` = ? WHERE id = ?";

    const values = [
        req.body.name,
        req.body.club,
        req.body.weapon,
        req.body.score,
    ]

    db.query(q, [...values,fencerId], (err, data)=>{
        if (err) return res.json(err);
        return res.json("Fencer updated successfully.");
    })
})

//Sets the port for the Node server API to 8080.
app.listen(8080, () => {
    console.log("Connected to backend on port 8080!")
});
