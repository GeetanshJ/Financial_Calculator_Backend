const express = require("express");
const router = express.Router();
const connection = require("../utils/database");

// Route for user registration
router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    try {
        const insertQuery = `INSERT INTO users (username, password) VALUES (?, ?)`;
        connection.query(
            insertQuery,
            [username, password],
            (err, results) => {
                if (err) {
                    console.error("Error registering user:", err);
                    res.status(500).json({ message: "Registration failed" });
                } else {
                    res.status(200).json({ message: "Registration successful" });
                }
            }
        );
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Registration failed" });
    }
});

// Route for user login
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    connection.query(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password],
        (err, results) => {
            if (err) {
                console.error("Error querying database:", err);
                return res.status(500).json({ message: "Login failed" });
            }

            if (results.length > 0) {
                res.status(200).json({ message: "Login successful" ,user:results[0]});
            } else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        }
    );
});

module.exports = router;
