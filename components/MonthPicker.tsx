import React, { useState, useEffect } from "react";

export default function MonthPicker({ filterSpents }: { filterSpents: any }) {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "Jule",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    filterSpents(month);
  }, [month]);

  const handlePreviousMonth = () => {
    setMonth((prevMonth) => (prevMonth > 1 ? prevMonth - 1 : 12));
  };

  const handleNextMonth = () => {
    setMonth((prevMonth) => (prevMonth < 12 ? prevMonth + 1 : 1));
  };

  return (
    <div className="text-center text-xl">
      <button onClick={handlePreviousMonth}> {"<"} </button>
      <span>{months[month - 1]}</span>
      <button onClick={handleNextMonth}>{">"}</button>
    </div>
  );
}
