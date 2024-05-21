
const express = require('express');
const router = express.Router();
const connection = require('../utils/database');

router.post('/calculate', (req, res) => {
    const {
        uid,
        currentAge,
        retirementAge,
        annualIncome,
        desiredRetirementIncome,
        annualReturn,
        monthlySavingsNeeded
    } = req.body;



    const query = 'INSERT INTO retirement_calculations (uid, currentAge, retirementAge, annualIncome, desiredRetirementIncome, annualReturn, monthlySavingsNeeded) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [uid, currentAge, retirementAge, annualIncome, desiredRetirementIncome, annualReturn, monthlySavingsNeeded];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error('Error saving retirement calculation:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(201).json({ message: 'Retirement calculation saved successfully' });
        }
    });
});

router.get('/:uid', (req, res) => {
    const uid = req.params.uid;
    const query = 'SELECT * FROM retirement_calculations WHERE uid = ?';

    connection.query(query, [uid], (err, results) => {
        if (err) {
            console.error('Error fetching retirement data:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json({ retirement: results });
        }
    });
});

module.exports = router;
