const express = require("express");
const router = express.Router();
const connection = require("../utils/database");

// Route for adding a loan
router.get("/",(req,res)=>{
    res.send("Hi");
})

module.exports = router;
