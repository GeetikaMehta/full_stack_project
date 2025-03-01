
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connection = require("../connection");
const router = express.Router();
router.use(bodyParser.json());


// const app = express();
// app.use(cors());
// app.use(bodyParser.json());


router.post("/", (req, res) => {
  const { role_name, employees_id } = req.body;
  const sql = "INSERT INTO role (role_name, employees_id) VALUES (?, ?)";
  connection.query(sql, [role_name, employees_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }
    res.json({ message: "Role created successfully!", role_id: result.insertId });
  });
});


router.get("/", (req, res) => {
  const sql = "SELECT * FROM role";
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }
    res.json(results);
  });
});


router.get("/", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM role WHERE role_id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.json(result[0]);
  });
});


router.put("/", (req, res) => {
  const { id } = req.params;
  const { role_name, employees_id } = req.body;
  const sql = "UPDATE role SET role_name = ?, employees_id = ? WHERE role_id = ?";
  connection.query(sql, [role_name, employees_id, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }
    res.json({ message: "Role updated successfully" });
  });
});


router.delete("/", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM role WHERE role_id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error", details: err });
    }
    res.json({ message: "Role deleted successfully" });
  });
});


module.exports = router;