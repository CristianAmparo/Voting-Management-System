import React, { useState, useEffect } from 'react';

function Duration() {
  const [alarmTime, setAlarmTime] = useState(new Date());
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [inputValues, setInputValues] = useState({
    day: '',
    hours: '',
    minutes: ''
  });

  // Handle changes to the alarm time input fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Input validation: Check if the input is a valid number
    if (!isNaN(value) && value >= 0) {
      setInputValues({
        ...inputValues,
        [name]: value
      });
    } else {
      setInputValues({
        ...inputValues,
        [name]: ''
      });
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Update the alarmTime state when the form is submitted
    const day = parseInt(inputValues.day) || 0;
    const hours = parseInt(inputValues.hours) || 0;
    const minutes = parseInt(inputValues.minutes) || 0;

    const newAlarmTime = new Date();
    newAlarmTime.setDate(newAlarmTime.getDate() + day);
    newAlarmTime.setHours(newAlarmTime.getHours() + hours);
    newAlarmTime.setMinutes(newAlarmTime.getMinutes() + minutes);
    newAlarmTime.setSeconds(0);

    setAlarmTime(newAlarmTime);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const remainingTime = alarmTime - currentTime;

      if (remainingTime <= 0) {
        clearInterval(intervalId);
        // Implement your alarm action here (e.g., play a sound)
      } else {
        setTimeRemaining(remainingTime);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [alarmTime]);

  // Function to format remaining time into days, hours, minutes, and seconds
  const formatTime = (time) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  };

  return (
    <div>
      <h2>Set Alarm</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Day"
          name="day"
          value={inputValues.day}
          onChange={handleInputChange}
        />
        <input
          type="number"
          placeholder="Hours"
          name="hours"
          value={inputValues.hours}
          onChange={handleInputChange}
        />
        <input
          type="number"
          placeholder="Minutes"
          name="minutes"
          value={inputValues.minutes}
          onChange={handleInputChange}
        />
        <button type="submit">Set Alarm</button>
      </form>

      <div>
        <h2>Time Remaining:</h2>
        <p>{formatTime(Math.max(0, timeRemaining))}</p>
      </div>
    </div>
  );
}

export default Duration;
