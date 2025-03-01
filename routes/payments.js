const express = require('express');
const router = express.Router();
const connection = require('../connection');

router.post('/', (req, res) => {
    const { order_id, user_id, payment_method, payment_status, transaction_id, amount_paid } = req.body;
    const sql = `INSERT INTO payments (order_id, user_id, payment_method, payment_status, transaction_id, amount_paid) VALUES (?, ?, ?, ?, ?, ?)`;
    connection.query(sql, [order_id, user_id, payment_method, payment_status, transaction_id, amount_paid], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Payment added', payment_id: result.insertId });
    });
});

router.get('/', (req, res) => {
    const sql = `SELECT * FROM payments`;
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});

router.get('/:id', (req, res) => {
    const sql = `SELECT * FROM payments WHERE payment_id = ?`;
    connection.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ message: 'Payment not found' });
        res.status(200).json(result[0]);
    });
});

router.put('/:id', (req, res) => {
    const { payment_status } = req.body;
    const sql = `UPDATE payments SET payment_status = ? WHERE payment_id = ?`;
    connection.query(sql, [payment_status, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Payment updated' });
    });
});

router.delete('/:id', (req, res) => {
    const sql = `DELETE FROM payments WHERE payment_id = ?`;
    connection.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Payment deleted' });
    });
});

module.exports = router;
