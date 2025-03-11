const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const { createEvent, getAllEventsWithTrades } = require('../controllers/eventController');

router.post('/create', auth, admin, createEvent);
router.get('/', auth, getAllEventsWithTrades);

module.exports = router;

