const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/user', require('./routes/user'));
app.use('/events', require('./routes/event'));
app.use('/trade', require('./routes/trade'));
app.use('/admin', require('./routes/admin'));

const server = http.createServer(app);
require('./sockets/socket')(server);

mongoose.connect(process.env.MONGO_URI);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


