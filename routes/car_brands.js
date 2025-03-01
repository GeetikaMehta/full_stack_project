const express = require("express");
const bodyParser = require("body-parser");
const connection = require("../connection");


const router = express.Router();
router.use(bodyParser.json());



// ✅ Fetch all brands
router.get("/", (req, res) => {
  connection.query("SELECT * FROM car_brands", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
});

// ✅ Fetch a specific brand by brand_id
router.get("/", (req, res) => {
  const brandId = req.params.id;
  connection.query("SELECT * FROM car_brands WHERE brand_id = ?", [brandId], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.length === 0) {
      res.status(404).json({ message: "Brand not found" });
    } else {
      res.status(200).json(results[0]);
    }
  });
});

// ✅ Insert a new brand
router.post("/", (req, res) => {
  const { brand_name, country, logo } = req.body;
  if (!brand_name) {
    return res.status(400).json({ message: "Brand name is required!" });
  }

  connection.query(
    "INSERT INTO car_brands (brand_name, country, logo) VALUES (?, ?, ?)",
    [brand_name, country, logo],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ message: "Brand added successfully!", brand_id: result.insertId });
      }
    }
  );
});

// ✅ Update an existing brand
router.put("/", (req, res) => {
  const brandId = req.params.id;
  const { brand_name, country, logo } = req.body;

  connection.query(
    "UPDATE car_brands SET brand_name = ?, country = ?, logo = ? WHERE brand_id = ?",
    [brand_name, country, logo, brandId],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ message: "Brand not found" });
      } else {
        res.status(200).json({ message: "Brand updated successfully!" });
      }
    }
  );
});

// ✅ Delete a brand
router.delete("/", (req, res) => {
  const brandId = req.params.id;

  connection.query("DELETE FROM car_brands WHERE brand_id = ?", [brandId], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: "Brand not found" });
    } else {
      res.status(200).json({ message: "Brand deleted successfully!" });
    }
  });
});

// Export the router
module.exports = router;
