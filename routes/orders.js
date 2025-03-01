const express = require("express");
const router = express.Router();
const connection = require("../connection");

router.post("/", (req, res) => {
    const { user_id, product_id, quantity, total_price, delivery_date } = req.body;
    const sql = "INSERT INTO orders (user_id, product_id, quantity, total_price, delivery_date) VALUES (?, ?, ?, ?, ?)";
    connection.query(sql, [user_id, product_id, quantity, total_price, delivery_date], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Order placed successfully", order_id: result.insertId });
    });
});

router.get("/", (req, res) => {
    connection.query("SELECT * FROM orders", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});

router.get("/:id", (req, res) => {
    const sql = "SELECT * FROM orders WHERE order_id = ?";
    connection.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: "Order not found" });
        res.status(200).json(result[0]);
    });
});

router.put("/:id", (req, res) => {
    const { order_status } = req.body;
    const sql = "UPDATE orders SET order_status = ? WHERE order_id = ?";
    connection.query(sql, [order_status, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Order not found" });
        res.status(200).json({ message: "Order status updated successfully" });
    });
});

router.delete("/:id", (req, res) => {
    const sql = "DELETE FROM orders WHERE order_id = ?";
    connection.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: "Order not found" });
        res.status(200).json({ message: "Order deleted successfully" });
    });
});

module.exports = router;
