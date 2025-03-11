const Trade = require('../models/trade');

exports.placeTrade = async (req, res) => {
  const { eventId, amount, odds } = req.body;
  const trade = new Trade({ userId: req.user.id, eventId, amount, odds, status: 'pending' });
  await trade.save();
  res.status(201).json(trade);
};

exports.getAllTrades = async (req, res) => {
  try {
    const trades = await Trade.find().populate('userId', 'username', 'balance');
    res.json(trades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserTrades = async (req, res) => {
  try {
    const trades = await Trade.find({ userId: req.user.id }).populate('eventId', 'name odds status');
    res.json(trades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.settleTrade = async (req, res) => {
    const { tradeId, outcome } = req.body;
  
    const trade = await Trade.findById(tradeId).populate('userId');
    if (!trade) return res.status(404).json({ message: 'Trade not found' });
  
    if (trade.status !== 'pending') {
      return res.status(400).json({ message: 'Trade already settled' });
    }
  
    // Determine win/loss
    if (outcome === 'win') {
      trade.status = 'won';
      trade.userId.balance += trade.amount * trade.odds;
    } else {
      trade.status = 'lost';
    }
  
    await trade.userId.save();
    await trade.save();
  
    res.json({ message: 'Trade settled successfully', trade });
  };
  

