let connection = require("../connection");
let express = require("express");
let bodyParser = require("body-parser");
const router = express.Router();

// Middleware to parse JSON body
router.use(bodyParser.json());

// Root Route
router.get("/", (req, resp) => {
  resp.send("<h1>Hello World!</h1>");
});

// Fetch all products
router.get("/", (req, resp) => {
  connection.query("SELECT * FROM products", (err, res) => {
    if (err) {
      resp.status(500).json({ error: err.message });
    } else {
      resp.status(200).json(res);
    }
  });
});

// Fetch individual product by ID
router.get("/:id", (req, resp) => {
  let productId = req.params.id;
  connection.query("SELECT * FROM products WHERE id = ?", [productId], (err, res) => {
    if (err) {
      resp.status(500).json({ error: err.message });
    } else if (res.length === 0) {
      resp.status(404).json({ msg: "Product not found" });
    } else {
      resp.status(200).json(res[0]);
    }
  });
});

// Insert new product
router.post("/", (req, resp) => {
  let body = req.body;
  if (!body.brand_id || !body.brand_name || !body.model_name || !body.year || !body.price || !body.quantity) {
    return resp.status(400).json({ msg: "Mandatory field is missing" });
  }

  let query = `INSERT INTO products 
    (brand_id, brand_name, model_name, year, price, quantity, fuel_type, transmission, seating_capacity, image_url) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  let values = [
    body.brand_id,
    body.brand_name,
    body.model_name,
    body.year,
    body.price,
    body.quantity,
    body.fuel_type,
    body.transmission,
    body.seating_capacity,
    body.image_url
  ];

  connection.query(query, values, (err, result) => {
    if (err) {
      return resp.status(500).json({ error: `Error in SQL: ${err.message}` });
    } else {
      return resp.status(201).json({ msg: "One record inserted successfully!", id: result.insertId });
    }
  });
});

// Delete product by ID
router.delete("/:id", (req, resp) => {
  let id = req.params.id;
  connection.query("DELETE FROM products WHERE id = ?", [id], (error, result) => {
    if (error) {
      return resp.status(500).json({ error: error.message });
    } else if (result.affectedRows === 0) {
      return resp.status(404).json({ msg: "Product not found" });
    } else {
      return resp.status(200).json({ msg: `Record deleted having id ${id}` });
    }
  });
});

// Update product by ID
router.put("/", (req, resp) => {
  let body = req.body;
  let id = req.params.id;

  if (!body.brand_name || !body.model_name || !body.price) {
    return resp.status(400).json({ msg: "Mandatory field is missing!" });
  }

  let query = `UPDATE products SET 
      brand_name=?, 
      model_name=?, 
      price=?, 
      quantity=?, 
      fuel_type=?, 
      transmission=? 
      WHERE id = ?`;

  let values = [
    body.brand_name,
    body.model_name,
    body.price,
    body.quantity,
    body.fuel_type,
    body.transmission,
    id
  ];

  connection.query(query, values, (error, result) => {
    if (error) {
      return resp.status(500).json({ error: error.message });
    } else if (result.affectedRows === 0) {
      return resp.status(404).json({ msg: "Product not found" });
    } else {
      return resp.status(200).json({ msg: "Record updated successfully!" });
    }
  });
});

module.exports = router;
