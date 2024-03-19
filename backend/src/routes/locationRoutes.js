const express = require('express');
const db = require('../db/db');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/api/locations', authController.getLocations);

router.get('/api/meetingRooms', async (req, res) => {
    const { locationId } = req.query;
  
    try {
      const result = await db.query('SELECT * FROM meeting_rooms WHERE location_id = $1', [locationId]);
      const meetingRooms = result.rows;
      res.json(meetingRooms);
    } catch (error) {
      console.error('Error fetching meeting rooms:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

module.exports = router;