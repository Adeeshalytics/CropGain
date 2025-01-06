"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";


const AddEvent: React.FC = () => {
  const router = useRouter();
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [eventInputs, setEventInputs] = useState<
  { _id?: string; name: string; time: Date | null }[]
>([]);

  // Format the date string from the URL query parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dateString = params.get("date");

    if (dateString) {
      const date = new Date(dateString);
      setFormattedDate(
        date.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
      setSelectedDate(date);
    }
  }, []);


  // Fetch events for the selected date from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      if (!selectedDate) return;
    
      try {
        const response = await fetch(
          `http://localhost:5000/api/events?date=${selectedDate.toISOString().split("T")[0]}`
        );
    
        if (response.ok) {
          const data = await response.json();
          if (data && data.events) {
            const formattedEvents = data.events.map((event: any) => ({
              _id: event._id, // Ensure this is mapped
              name: event.name,
              time: event.time ? new Date(`1970-01-01T${event.time}`) : null,
            }));
            setEventInputs(formattedEvents);
          }
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    
    fetchEvents();
  }, [selectedDate]);
  
  




  const handleBack = () => {
    router.back();
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setFormattedDate(
      date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
    setShowCalendar(false);
  };


//Eventclcick function

  const handleAddEventClick = () => {

    setEventInputs([...eventInputs, { name: "", time: null }]); // Add new input fields
  };





  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newInputs = [...eventInputs];
    newInputs[index].name = event.target.value; // Update event name
    setEventInputs(newInputs);
  };

  const handleTimeChange = (index: number, time: Date | null) => {
    const newInputs = [...eventInputs];
    newInputs[index].time = time ? new Date(time) : null; // Ensure it's a Date object
    setEventInputs(newInputs);
  };
  



  const handleSaveEvents = async () => {
    if (!selectedDate) {
      alert("Please select a date first.");
      return;
    }
  
    // Ensure the data structure matches the schema
    const formattedEvents = eventInputs.map((event) => ({
      name: event.name,
      time: event.time?.toISOString().split("T")[1], // Only include the time part
    }));
  
    try {
      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: selectedDate.toISOString().split("T")[0], // Only include the date part
          events: formattedEvents,
        }),
      });
  
      if (response.ok) {
        alert("Events saved successfully.");
      } else {
        console.error("Failed to save events, status:", response.status);
      }
    } catch (error) {
      console.error("Error saving events:", error);
    }
  };
  
  //Delete Function

  const handleDeleteEvent = async (index: number) => {
    const eventToDelete = eventInputs[index];
    console.log("Event to delete:", eventToDelete);
  
    if (!eventToDelete) {
      console.error("No event found");
      return;
    }
  
    // If the event has no _id, it's an unsaved event (UI-only)
    if (!eventToDelete._id) {
      // Remove the event from the UI state
      const updatedEvents = eventInputs.filter((_, i) => i !== index);
      setEventInputs(updatedEvents);
      console.log("Unsaved event removed from UI");
      return;
    }
  
    // If the event has an _id, it's a saved event (backend)
    try {
      const response = await fetch(
        `http://localhost:5000/api/events/${eventToDelete._id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date: selectedDate?.toISOString().split("T")[0] }),
        }
      );
  
      if (response.ok) {
        const updatedData = await response.json();
        setEventInputs(updatedData.events); // Update with fresh data
      } else {
        throw new Error(`Failed to delete: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };



  
  //Edit Function

  const handleEditEvent = async (index: number) => {
    const eventToUpdate = eventInputs[index];
  
    
    const updatedEvent = {
      ...eventToUpdate,
      name: prompt("Enter new event name:", eventToUpdate.name) || eventToUpdate.name,
      time: prompt("Enter new event time:", eventToUpdate.time?.toISOString()) || eventToUpdate.time,
    };
  
    try {
      const response = await fetch(`http://localhost:5000/api/events/${eventToUpdate.id}`, {
        method: "PUT", // Make sure you use PUT for updating
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: updatedEvent.name,
          time: updatedEvent.time?.toISOString(),
        }),
      });
  
      if (response.ok) {
        const updatedEventData = await response.json();
        // Update the event locally after successful update
        const newEventInputs = [...eventInputs];
        newEventInputs[index] = updatedEventData; // Replace the old event with updated event data
        setEventInputs(newEventInputs);
      } else {
        console.error("Failed to update event, status:", response.status);
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };
  

  return (
    <div className="flex flex-col items-center p-10 text-lg">
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-7xl mb-6">
        <div className="flex items-center space-x-4 text-2xl font-semibold w-2/3">
          <h1 className="text-3xl font-medium text-gray-800 font-roboto">
            {formattedDate || "Select a date"}
          </h1>
        </div>

        {/* Calendar Icon */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleCalendar}
            className="p-4 bg-gray-200 rounded-lg text-3xl"
          >
            <FontAwesomeIcon icon={faCalendar} className="text-blue-700" />
          </button>
        </div>
      </div>

      {/* Display the calendar if showCalendar is true */}
      {showCalendar && (
        <div className="mb-4">
          <Calendar
            onChange={handleDateSelect}
            value={selectedDate}
            className="border-2 border-gray-300 rounded-lg"
          />
        </div>
      )}

      <div className="w-full max-w-7xl flex items-center justify-between mb-4">
        <button
          onClick={handleAddEventClick}
          className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg text-xl transform transition-transform duration-300 ease-in-out hover:scale-105"
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Add Event</span>
        </button>
      </div>

      {/* Input Fields for Events */}
      <div className="w-full max-w-7xl bg-gray-200 rounded-lg p-8 flex flex-col items-center">
        {eventInputs.map((input, index) => (
          <div key={index} className="w-full flex items-center mb-4 font-roboto">
            <input
              type="text"
              value={input.name}
              onChange={(event) => handleInputChange(index, event)}
              placeholder="Enter event name"
              className="border p-2 rounded w-4/5 mr-6"
            />

            <div className="w-1/4">
              <DatePicker
                selected={input.time || null}
                onChange={(time: Date) => handleTimeChange(index, time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                dateFormat="h:mm aa"
                className="border p-2 rounded w-2/5 font-roboto"
                placeholderText="Time"
              />
            </div>

            <div className="flex space-x-6 text-xl -ml-14">
            
            <div className="border border-red-700 rounded-md p-2 inline-block bg-red-600 hover:scale-105">
  <button
    onClick={() => handleDeleteEvent(index)}
    className="text-white "
  >
    Delete
  </button>
</div>


            </div>
          </div>
        ))}

        <button
          onClick={handleSaveEvents}
          className="px-4 py-2 bg-blue-600 text-white rounded mt-4"
        >
          Save All Events
        </button>
      </div>

      <button
        onClick={handleBack}
        className="px-4 py-2 bg-blue-600 text-white rounded mt-10"
      >
        Go Back
      </button>
    </div>
  );
};

export default AddEvent;
