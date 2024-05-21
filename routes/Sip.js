const express = require("express");
const router = express.Router();
const connection = require("../utils/database");

router.post("/add", async (req, res) => {
    const {
        uid,
        investmentAmount,
        numberOfPayments,
        interestRate,
        maturityAmount,
    } = req.body;

    try {

        connection.query(
            "INSERT INTO sip (uid, investmentAmount, numberOfPayments, interestRate, maturityAmount) VALUES (?, ?, ?, ?, ?)",
            [uid, investmentAmount, numberOfPayments, interestRate, maturityAmount]
        );
        res.status(201).json({ message: "SIP entry added successfully" });
    } catch (error) {
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
                res.status(200).json({ sip: results});
            }
        });
    } catch (error) {
        console.error("Error fetching SIP entries:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}); 

module.exports = router;
