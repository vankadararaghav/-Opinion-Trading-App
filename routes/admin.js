const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const { getAllEventsWithTrades } = require('../controllers/eventController');
const { getAllTrades, settleTrade } = require('../controllers/tradeController');

router.get('/events', auth, admin, getAllEventsWithTrades);
router.get('/trades', auth, admin, getAllTrades);
router.post('/trades/settle', auth, admin, settleTrade);

module.exports = router;
