const express = require("express");
const router = express.Router();
const connection = require("../connection");


router.post("/", (req, res) => {
    const { location_name, postal_code, pin_code, delivery } = req.body;
    const sql = "INSERT INTO location (location_name, postal_code, pin_code, delivery) VALUES (?, ?, ?, ?)";
    
    connection.query(sql, [location_name, postal_code, pin_code, delivery], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Location added successfully", location_id: result.insertId });
    });
});


router.get("/", (req, res) => {
    connection.query("SELECT * FROM location", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});


router.get("/", (req, res) => {
    const sql = "SELECT * FROM location WHERE location_id = ?";
    connection.query(sql, [req.params.location_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: "Location not found" });
        res.json(result[0]);
    });
});


router.put("/", (req, res) => {
    const { location_name, postal_code, pin_code, delivery } = req.body;
    const sql = "UPDATE location SET location_name=?, postal_code=?, pin_code=?, delivery=? WHERE location_id=?";
    
    connection.query(sql, [location_name, postal_code, pin_code, delivery, req.params.location_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Location updated successfully" });
    });
});


router.delete("/", (req, res) => {
    connection.query("DELETE FROM location WHERE location_id = ?", [req.params.location_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Location deleted successfully" });
    });
});

module.exports = router;
