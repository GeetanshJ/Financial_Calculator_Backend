const express = require("express");
const router = express.Router();
const connection = require("../utils/database");

router.get("/",(req,res)=>{
    res.send("Hi");
})

module.exports = router;
