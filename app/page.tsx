"use client";
import React, { ChangeEvent, useState } from "react";
import { Spent } from "@/types/Spent";
import { DateValue } from "@internationalized/date";
import SpendingTable from "@/components/SpendingTable";
import SpentForm from "@/components/SpentForm";

export default function Home() {
  const spendingArray: Spent[] = [
    {
      subject: "Apartment",
      date: "2024-05-01",
      spent: "800",
      id: 1,
    },
    {
      subject: "Gym membership",
      date: "2024-05-01",
      spent: "25",
      id: 2,
    },
    {
      subject: "Food for whole week",
      date: "2024-05-01",
      spent: "50",
      id: 3,
    },
  ];

  // in future globalSpending should be data from store or database
  const [globalSpending, setGlobalSpending] = useState(spendingArray);

  const [spending, setSpending] = useState(globalSpending);

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
    setGlobalSpending([...spending, spent]);
  }

  function deleteBeiId(id: number) {
    setSpending((prevSpending) =>
      prevSpending.filter((spent) => spent.id !== id),
    );

    setGlobalSpending((prevSpending) =>
      prevSpending.filter((spent) => spent.id !== id),
    );
  }

  function editSpent(spent: Spent, id: number) {
    console.log(spent, id);
    setGlobalSpending(spending);
  }

  function cancelSpentEdit() {
    setSpending(globalSpending);
  }

  function onEdit(
    event: ChangeEvent<HTMLInputElement> | DateValue,
    id: number,
  ) {
    if ("target" in event) {
      const { name, value } = event.target;
      console.log(value);

      setSpending((prevSpending) =>
        prevSpending.map((spent) =>
          spent.id === id ? { ...spent, [name]: value } : spent,
        ),
      );
    } else {
      setSpending((prevSpending) =>
        prevSpending.map((spent) =>
          spent.id === id ? { ...spent, date: event.toString() } : spent,
        ),
      );
    }
  }

  return (
    <>
      <h1>Finance overview</h1>
      <SpendingTable
        onEdit={onEdit}
        editSpent={editSpent}
        columns={columns}
        spending={spending}
        onDelete={deleteBeiId}
        cancelSpentEdit={cancelSpentEdit}
      />
      <SpentForm addSpent={addSpent} />
    </>
  );
}
