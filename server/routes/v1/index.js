const express = require("express");

const router = express.Router();

router.get("/", (req, res) => res.status(200).json({ expensewise: "Hello World!" }));
module.exports = router;
