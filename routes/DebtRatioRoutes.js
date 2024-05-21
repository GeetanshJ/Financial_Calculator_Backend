const express = require("express");
const router = express.Router();
const connection = require("../utils/database");

router.post("/add", (req, res) => {
  const { uid, debt, income, ratio } = req.body;

  try {
    const insertQuery = `INSERT INTO debttoincome (uid,debt, income, ratio) VALUES (?, ?, ?, ?)`;
    connection.query(
      insertQuery,
      [uid,debt, income, ratio],
      (err, results) => {
        if (err) {
          console.error("Error adding debttoincome:", err);
          res.status(500).json({ message: "Failed to add debttoincome" });
        } else {
          res.status(201).json({ message: "debttoincome added successfully" });
        }
      }
    );
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to add debttoincome" });
  }
});

router.get("/:uid", (req, res) => {
  const uid = req.params.uid;
  console.log(uid + "uid from backend")

  try {
    const selectQuery = `SELECT * FROM debttoincome WHERE uid = ?`;
    connection.query(selectQuery, [uid], (err, results) => {
      if (err) {
        console.error("Error fetching debttoincome:", err);
        res.status(500).json({ message: "Failed to fetch lodebttoincomeans" });
      } else {

        console.log(results)
        res.status(200).json({ ratio: results });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to fetch debttoincome" });
  }
});

module.exports = router;
