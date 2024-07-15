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

  return (
    <div className="text-center text-xl">
      <button onClick={handlePreviousMonth}> {"<"} </button>
      <span>{selectedMonth}</span>
      <button onClick={handleNextMonth}>{">"}</button>
    </div>
  );
}
