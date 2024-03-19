const express = require('express');
const db = require('../db/db');
const itemController = require('../controllers/itemController');
const router = express.Router();

const authController = require('../controllers/authController');

router.get('/', authController.getHotSnacks);
router.get('/beverages', authController.getBeverages);
router.get('/munchies', authController.getMunchies);
router.post('/getitems', itemController.getItems);
router.post('/search', itemController.search);
router.post('/additem', itemController.additem);

module.exports = router;