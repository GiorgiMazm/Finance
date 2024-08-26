import DatePicker from "@/components/DatePicker";
import Month from "@/components/Month";
import SpentForm from "@/components/SpentForm";
import React from "react";

export default function Spending() {
  return (
    <div className="container mx-auto">
      <h1 className="text-center text-3xl mb-5">Montly Spending</h1>
      <div>
        <DatePicker />
        <SpentForm />
      </div>
      <Month />
    </div>
  );
}
