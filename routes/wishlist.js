const express = require('express');
const router = express.Router();
const connection = require('../connection'); // Assuming your DB connection is in db.js

// Add to Wishlist
router.post('/', (req, res) => {
    const { user_id, product_id } = req.body;
    const query = 'INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)';
    connection.query(query, [user_id, product_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Product added to wishlist', wishlist_id: result.insertId });
    });
});

// Get Wishlist by User ID
router.get('/:id', (req, res) => {
    const { user_id } = req.params;
    const query = `
        SELECT w.wishlist_id, w.date_added, p.* 
        FROM wishlist w
        JOIN products p ON w.product_id = p.id
        WHERE w.user_id = ?
    `;
    connection.query(query, [user_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});

// Remove from Wishlist
router.delete('/:wishlist_id', (req, res) => {
    const { wishlist_id } = req.params;
    const query = 'DELETE FROM wishlist WHERE wishlist_id = ?';
    connection.query(query, [wishlist_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Item removed from wishlist' });
    });
});

module.exports = router;
