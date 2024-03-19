const express = require('express');
const db = require('../db/db');

const router = express.Router();

const authController = require('../controllers/authController');

router.get('/', authController.getHotSnacks);
router.get('/beverages', authController.getBeverages);
router.get('/munchies', authController.getMunchies);

module.exports = router;