const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { placeTrade, getUserTrades } = require('../controllers/tradeController');

router.post('/', auth, placeTrade);
router.get('/',auth, getUserTrades);

module.exports = router;
