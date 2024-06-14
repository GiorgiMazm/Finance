"use client";
import React, { useState } from "react";
import { Spent } from "@/types/Spent";
import SpentForm from "@/components/SpentForm";
import SpendingTable from "@/components/SpendingTable";

export default function Home() {
  const spendingArray: Spent[] = [
    {
      subject: "Apartment",
      date: "01.05.2024",
      spent: "800",
      id: 1,
    },
    {
      subject: "Gym membership",
      date: "01.05.2024",
      spent: "25",
      id: 2,
    },
    {
      subject: "Food for whole week",
      date: "03.05.2024",
      spent: "50",
      id: 3,
    },
  ];
  const [spending, setSpending] = useState(spendingArray);

  const columns = [
    {
      key: "subject",
      label: "Subject",
    },
    {
      key: "date",
      label: "Date",
    },
    {
      key: "spent",
      label: "Spent",
    },
    {
      key: "actions",
      label: "Actions",
    },
  ];

  function addSpent(spent: Spent) {
    setSpending([...spending, spent]);
  }

  function deleteBeiId(id: number) {
    setSpending((prevSpending) =>
      prevSpending.filter((spent) => spent.id !== id),
    );
  }

  return (
    <>
      <h1>Finance overview</h1>
      <SpentForm addSpent={addSpent} />
      <SpendingTable
        columns={columns}
        spending={spending}
        deleteBeiId={deleteBeiId}
      />
    </>
  );
}
