const express = require('express');
const router = express.Router();
const Event = require('../models/Eventmodels'); 
const mongoose = require('mongoose');



// Save events
router.post("/", async (req, res) => {
  const { date, events } = req.body;

  // Input validation
  if (!date || !Array.isArray(events)) {
    return res.status(400).json({ message: "Invalid request body. 'date' and 'events' (array) are required." });
  }

  // Ensure that each event time is in a valid format before saving
  const formattedEvents = events.map(event => {
    if (event.time && typeof event.time === 'string') {
      // Convert the event time to an ISO string if it's in string format
      event.time = new Date(`1970-01-01T${event.time}`).toISOString().split('T')[1]; // Store only the time part
    }
    return event;
  });

  try {
    // Check if an event with the same date already exists
    let eventData = await Event.findOne({ date });

    if (eventData) {
      // Update existing events
      eventData.events = formattedEvents;
    } else {
      // Create a new event document
      eventData = new Event({ date, events: formattedEvents });
    }

    // Save the event data to MongoDB
    await eventData.save();
    res.status(200).json({ message: "Events saved successfully" });
  } catch (error) {
    console.error("Error saving events:", error);
    res.status(500).json({ message: "Failed to save events" });
  }
});



// Fetch events
router.get("/", async (req, res) => {
  const { date } = req.query;

  // Input validation
  if (!date) {
    return res.status(400).json({ message: "Date query parameter is required" });
  }

  try {
    // Find events for the given date
    const eventData = await Event.findOne({ date });

    if (!eventData) {
      return res.status(200).json({ events: [] });
    }

    // Return the events with properly formatted time
    const eventsWithFormattedTime = eventData.events.map(event => {
      if (event.time) {
        // Convert time back to a string that can be parsed by Date object
        event.time = event.time.split(':').length === 2 ? `00:${event.time}` : event.time;
      }
      return event;
    });

    res.status(200).json({ events: eventsWithFormattedTime });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Failed to fetch events" });
  }
});

//Delete

router.delete("/:id", async (req, res) => {
  try {
      const { id } = req.params;
      const { date } = req.body;

      console.log("Delete Request Received:", { id, date });

      const eventData = await Event.findOneAndUpdate(
          { date },
          { $pull: { events: { _id: id } } },
          { new: true }
      );

      if (!eventData) {
          return res.status(404).json({ message: "Event not found" });
      }

      res.json({ message: "Event deleted successfully", events: eventData.events });
  } catch (error) {
      res.status(500).json({ message: "Error deleting event", error });
  }
});





module.exports = router;
