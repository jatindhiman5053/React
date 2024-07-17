const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "reactproject",
});

app.post("/signup", (req, res) => {
  const sql = "INSERT INTO signup (`name`,`email`,`password`) VALUES (?)";
  const values = [req.body.name, req.body.email, req.body.password];
  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM `signup` WHERE email = ? AND password = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json("Success");
    } else {
      return res.json("Failed");
    }
  });
});

app.post("/alluser", (req, res) => {
  const sql = "SELECT * FROM `signup`";
  db.query(sql, [], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json(data);
    } else {
      return res.json("Failed");
    }
  });
});

app.post("/edituser", (req, res) => {
  const sql = "UPDATE signup SET `name` = ? WHERE `id` = ?";
  const values = [req.body.name, req.body.id];
  db.query(sql, values, (err, data) => {
    if (err) {
      return res.json("Error");
    }
    return res.json(data);
  });
});

app.post("/deleteuser", (req, res) => {
  const sql = "DELETE FROM signup WHERE `id` = ?";
  const id = req.body.id;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting user:", err);
      return res.status(500).json({ error: "Failed to delete user" });
    }
    if (result.affectedRows > 0) {
      return res.status(200).json({ message: "User deleted successfully" });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  });
});


app.listen(8081, () => {
  console.log("listen");
});
