const express = require('express');
const db = require('../db/db');

const router = express.Router();

const authController = require('../controllers/authController');

router.post('/',authController.placeOrder);

module.exports = router;