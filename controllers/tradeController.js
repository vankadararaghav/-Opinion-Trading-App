const Trade = require('../models/trade');
const User = require('../models/user');


exports.placeTrade = async (req, res) => {
  const { eventId, amount, odds } = req.body;
  const user  = await User.findById(req.user.id)
  if(user.balance<amount){ 
    return res.status(400).send({
      message: "you cannot trade with the balance you have in your account"
    })
  }
  const trade = new Trade({ userId: req.user.id, eventId, amount, odds, status: 'pending' });
  console.log('user balance', user.balance)
  user.balance = user.balance - amount;
  await user.save()
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
    const {user} = req ;
    const trades = await Trade.find({ userId: user.id }).populate('eventId', 'name status');
    console.log(trades)
    res.json(trades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.settleTrade = async (req, res) => {
    const { tradeId, winningTeam } = req.body;
  
    const trade = await Trade.findById(tradeId).populate('userId', 'username balance');
    if (!trade) return res.status(404).json({ message: 'Trade not found' });
  
    if (trade.status !== 'pending') {
      return res.status(400).json({ message: 'Trade already settled' });
    }

    if(trade.odds[winningTeam]){
      trade.status = 'won';
      trade.userId.balance += trade.amount * trade.odds[winningTeam];
    }
    else{
      trade.status = "lost";
    }
    await trade.userId.save();
    await trade.save();
  
    res.json({ message: 'Trade settled successfully', trade });
  };
  

