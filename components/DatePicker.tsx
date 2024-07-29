"use client";
import { useDispatch, useSelector } from "react-redux";
import { initialStateInterface, setSelectedDate } from "@/lib/state/appSLice";
import { Input } from "@nextui-org/react";
import React from "react";

export default function DatePicker({}: {}) {
  const dispatch = useDispatch();
  const selectedDate = useSelector(
    (state: initialStateInterface) => state.selectedDate,
  );

  function handleDateChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
    dispatch(setSelectedDate(event.target.value));
  }

  return (
    <div className="text-center text-xl">
      <Input
        className="w-80 mx-auto"
        type="month"
        name="subject"
        value={selectedDate}
        onChange={(event) => handleDateChange(event)}
        placeholder={`Enter`}
      />
    </div>
  );
}
