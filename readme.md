
Project setup:

1) git clone
2) npm i 
3) setup env variables of PORT JWT_SECRET MONGO_URI


User Routes

POST /user/register – Register a new user

POST /user/login – Login and get JWT token

Event Routes

POST /events/create – Create a new event

GET /events – Get list of available events

Trade Routes

POST /trade – Place a trade on an event

GET /trade – Get list of trades for logged-in user

Admin Routes

GET /admin/events – Get all events with trade details

GET /admin/trades – Get all trades with user details

POST /admin/trades/settle – Settle a trade based on event outcome

