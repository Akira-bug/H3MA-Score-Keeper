import express from "express"
import mysql from "mysql"
import cors from "cors"
import { exec } from "child_process"

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

//Sets the port for the Node server API to 8080.
app.listen(8080, () => {
    console.log("Connected to backend on port 8080!")
});

///////////////////////////////////////FENCERS RELATED 
//functions for retrieving all fencers from the database
app.get("/fencers", (req,res)=>{
    const q = "SELECT DISTINCT * FROM fencers"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

//functions for adding a new fencer into the database
app.post("/fencers", (req,res)=>{
    const q = "INSERT IGNORE INTO fencers (`name`,`club`,`weapon`) VALUES (?)"
    const values = [
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

///////////////////////////////////////MATCHES RELATED 
// Route to add match data to the database
app.post("/matches", (req, res) => {
    const q = "INSERT INTO matches (`fighter1`, `fighter2`, `weapon1`, `weapon2`, `score1`, `score2`, `victor`, `doubles`, `exchanges`, `duration`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.fighter1,
        req.body.fighter2,
        req.body.weapon1,
        req.body.weapon2,
        req.body.score1,
        req.body.score2,
        req.body.victor,
        req.body.doubles,
        req.body.exchanges,
        req.body.duration
    ];
  
    db.query(q, values, (err, data) => {
        if (err) return res.json(err);
        
        // Assuming you want to return the inserted match ID
        return res.json({ message: "Match data has been added successfully.", matchId: data.insertId });
    });
});

app.get("/matches", (req,res)=>{
    const q = "SELECT * FROM matches"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/matches/:id", (req,res)=>{
    const q = "SELECT * FROM matches WHERE `id` = ?"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
app.put("/matches/:id", (req, res) => {
    const matchId = req.params.id;
    const {
        fighter1,
        fighter2,
        score1,
        score2,
        weapon1,
        weapon2,
        victor,
        doubles,
        exchanges,
        duration
    } = req.body;
  
    const q = `
      UPDATE matches
      SET
        fighter1 = ?,
        fighter2 = ?,
        score1 = ?,
        score2 = ?,
        weapon1 = ?,
        weapon2 = ?,
        victor = ?,
        doubles = ?,
        exchanges = ?,
        duration = ?
      WHERE
        id = ?
    `;
  
    const values = [
      fighter1,
      fighter2,
      score1,
      score2,
      weapon1,
      weapon2,
      victor,
      doubles,
      exchanges,
      duration,
      matchId
    ];
  
    db.query(q, values, (err, data) => {
      if (err) return res.json(err);
  
      return res.json({ message: "Match data has been updated successfully." });
    });
  });


app.delete("/matches/:id", (req,res)=>{
    const matchId = req.params.id;
    const q = "DELETE FROM matches WHERE id = ?"

    db.query(q, [matchId], (err, data)=>{
        if (err) return res.json(err);
        return res.json("Match was deleted successfully.");
    })
})

///////////////////////////////////////BACKUP RELATED 
app.post('/backup', (req, res) => {
    // Execute the Bash script
    const scriptPath = '/vagrant/export-db.sh';
    exec(scriptPath, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing script: ${error}`);
        res.status(500).json({ error: 'An error occurred during backup/restore.' });
        return;
      }
      console.log(`Script output: ${stdout}`);
      console.error(`Script errors: ${stderr}`);
      res.status(200).json({ message: 'Backup/restore completed successfully.' });
    });
  });

