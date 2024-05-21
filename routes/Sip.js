const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const connection = require("../utils/database");

router.post("/add", async (req, res) => {
    const {
        uid,
        investmentAmount,
        numberOfPayments,
        interestRate,
        maturityAmount,
        password
    } = req.body;

    try {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = connection.query(
            "INSERT INTO sip (uid, investmentAmount, numberOfPayments, interestRate, maturityAmount, password) VALUES (?, ?, ?, ?, ?, ?)",
            [uid, investmentAmount, numberOfPayments, interestRate, maturityAmount, hashedPassword]
        );
        res.status(201).json({ message: "SIP entry added successfully" });
    } catch (error) {
        console.error("Error adding SIP entry:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/:uid", async (req, res) => {
    const uid = req.params.uid;
    try {
        const selectQuery = "SELECT * FROM sip WHERE uid = ?";
        connection.query(selectQuery, [uid], (err, results) => {
            if (err) {
                console.error("Error fetching data:", err);
                res.status(500).json({ message: "Failed to fetch data" });
            } else {
                console.log("SIP history fetched successfully:");
                res.status(200).json({ sip: results[0] });
            }
        });
    } catch (error) { 
        console.error("Error fetching SIP entries:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}); 

module.exports = router;
