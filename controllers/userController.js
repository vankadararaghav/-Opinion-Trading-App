const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ username, password: hashedPassword, role });
  await user.save();

  res.status(201).json({ message: 'User created' });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

exports.updateAccountBalance = async (req,res) =>{
    const { balance } = req.body
    const user  = await User.findById(req.user.id)
    user.balance = user.balance  + balance;
    await user.save();
    res.send({
      message: "updated balance"
    })
}

exports.userDetails = async (req,res)=>{
   const user = await User.findById(req.user.id)
   return res.status(200).send(user
   )
}