import React, { useState, useEffect } from "react";

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const DisplayDate = () => {
  const [hours, setHours] = useState(() => Number(localStorage.getItem("hours")) || 6);
  const [minutes, setMinutes] = useState(() => Number(localStorage.getItem("minutes")) || 0);
  const [day, setDay] = useState(() => Number(localStorage.getItem("day")) || 1);
  const [weekDay, setWeekDay] = useState(() => localStorage.getItem("weekDay") || "Monday");

  // Interval waktu berjalan
  useEffect(() => {
    const timer = setInterval(() => {
      setMinutes(prev => {
        let newMinutes = prev + 1;
        let newHours = hours;
        let newDay = day;
        let newWeekDay = weekDay;
        if (newMinutes >= 60) {
          newMinutes = 0;
          newHours = hours + 1;
          if (newHours >= 24) {
            newHours = 0;
            newDay = day + 1;
            let weekDayIndex = daysOfWeek.indexOf(weekDay);
            weekDayIndex = (weekDayIndex + 1) % 7;
            newWeekDay = daysOfWeek[weekDayIndex];
            setDay(newDay);
            setWeekDay(newWeekDay);
            localStorage.setItem("day", newDay);
            localStorage.setItem("weekDay", newWeekDay);
          }
          setHours(newHours);
          localStorage.setItem("hours", newHours);
        }
        localStorage.setItem("minutes", newMinutes);
        return newMinutes;
      });
    }, 300);
    return () => clearInterval(timer);
  }, [hours, day, weekDay]);

  useEffect(() => {
    const syncFromStorage = () => {
      setHours(Number(localStorage.getItem("hours")) || 6);
      setMinutes(Number(localStorage.getItem("minutes")) || 0);
      setDay(Number(localStorage.getItem("day")) || 1);
      setWeekDay(localStorage.getItem("weekDay") || "Monday");
    };
    window.addEventListener("storage", syncFromStorage);
    window.addEventListener("force-time-sync", syncFromStorage); // listen custom event
    syncFromStorage();
    return () => {
      window.removeEventListener("storage", syncFromStorage);
      window.removeEventListener("force-time-sync", syncFromStorage);
    };
  }, []);

  const formatTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  const greeting = getGreeting(hours);
  const playerName = localStorage.getItem("playerName") || "Player";

  function getGreeting(hour) {
    if (hour >= 3 && hour < 11) return "Good Morning";
    if (hour >= 11 && hour < 15) return "Good Afternoon";
    if (hour >= 15 && hour < 19) return "Good Evening";
    return "Good Night";
  }

  return (
    <div>
      <div className="date">Day {day} - {weekDay} | {formatTime}</div>
      <div className="character-name">{greeting}, {playerName}!</div>
    </div>
  );
};

export default DisplayDate;