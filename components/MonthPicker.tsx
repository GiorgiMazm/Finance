"use client";
import { useDispatch, useSelector } from "react-redux";
import { initialStateInterface, setSelectedMonth } from "@/lib/state/appSLice";

export default function MonthPicker({}: {}) {
  const dispatch = useDispatch();
  const selectedMonth = useSelector(
    (state: initialStateInterface) => state.selectedMonth,
  );
  const handlePreviousMonth = () => {
    console.log("prev");
    dispatch(setSelectedMonth(selectedMonth === 1 ? 12 : selectedMonth - 1));
  };

  const handleNextMonth = () => {
    console.log("next");
    dispatch(setSelectedMonth(selectedMonth === 12 ? 1 : selectedMonth + 1));
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="text-center text-xl">
      <button onClick={handlePreviousMonth}> {"<"} </button>
      <span className="inline-block w-40">{months[selectedMonth - 1]}</span>
      <button onClick={handleNextMonth}>{">"}</button>
    </div>
  );
}
