const Event = require('../models/event');

exports.getAllEventsWithTrades = async (req, res) => {
    try {
      const events = await Event.find().populate({
        path: 'trades',
        populate: { path: 'userId', select: 'username balance' }
      });
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

async function setinterval(eventId){
   const event = await Event.findById(eventId)
   console.log("event in setinterval", event)
   setInterval(async ()=>{
     const odds = {...event["odds"]}
     Object.entries(odds).map(async ([key, value])=>{
       odds[key] = Number((Math.random())*10 + 1).toFixed(2)
     })
     event["odds"] = odds;
     console.log("odss in setInterval", event["odds"])
     await event.save();
   },3000)
}

exports.createEvent = async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  setinterval(event.id)
  res.status(201).json(event);
};

exports.getAllEvents = async (req, res) => {
    try {
      const events = await Event.find()
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};