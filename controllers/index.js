const express = require('express');
const router = express.Router();

router.use('/task', require('./task/home'))

module.exports = router;