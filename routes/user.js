const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { register, login, updateAccountBalance, userDetails } = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.get('/details', auth, userDetails)
router.post('/updatebalance', auth, updateAccountBalance)
module.exports = router;
