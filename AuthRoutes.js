const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const connection = require("../utils/database");

router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const insertQuery = `INSERT INTO users (username, password) VALUES (?, ?)`;
        connection.query(insertQuery, [username, hashedPassword], (err, results) => {
            if (err) {
                console.error("Error registering user:", err);
                return res.status(500).json({ message: "Registration failed" });
            }
            res.status(201).json({ message: "Registration successful" });
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Registration failed" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const selectQuery = `SELECT * FROM users WHERE email = ?`;
        connection.query(selectQuery, [email], async (err, results) => {
            if (err) {
                console.error("Error querying database:", err);
                return res.status(500).json({ message: "Login failed" });
            }
            if (results.length > 0) {
                const hashedPassword = results[0].password;
                const match = await bcrypt.compare(password, hashedPassword);
                if (match) {
                    res.status(200).json({ message: "Login successful", user: results[0] });
                } else {
                    res.status(401).json({ message: "Invalid credentials" });
                }
            } else {
                res.status(401).json({ message: "Invalid credentials" }); 
            }
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Login failed" });
    }
});

module.exports = router;
