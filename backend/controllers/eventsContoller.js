const Event = require("../models/Eventmodels");

exports.getEvents = async (req, res) => {
  try {
    const { date } = req.query;
    const query = date ? { date } : {};
    const events = await Event.find(query);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
};


const Joi = require("joi");


// Validation schema
const eventSchema = Joi.object({
  name: Joi.string().required(),
  time: Joi.string().required(), // ISO time string
});

const addEvents = async (req, res) => {
  try {
    const { date, events } = req.body;

    // Log incoming data for debugging
    console.log("Incoming Data:", { date, events });

    // Validate input
    if (!date || !events || !Array.isArray(events)) {
      return res.status(400).json({ message: "Invalid input format" });
    }

    for (const event of events) {
      const { error } = eventSchema.validate(event);
      if (error) {
        return res.status(400).json({ message: "Validation error", error: error.details });
      }
    }

    // Create and save event
    const newEvent = new Event({ date, events });
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error("Error adding events:", error);
    res.status(500).json({ message: "Error adding events", error });
  }
};

module.exports = { addEvents };





exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, time } = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { name, time },
      { new: true }
    );
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error });
  }
};




exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    res.json({ message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
};
