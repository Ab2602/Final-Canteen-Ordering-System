const express = require('express');
const db = require('../db/db');

const router = express.Router();

const authController = require('../controllers/authController');

router.post('/',authController.placeOrder);
router.get('/my_orders', authController.my_orders);

module.exports = router;