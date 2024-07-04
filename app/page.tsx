"use client";
import React, { ChangeEvent, useState } from "react";
import { Spent } from "@/types/Spent";
import { DateValue } from "@internationalized/date";
import SpendingTable from "@/components/SpendingTable";
import SpentForm from "@/components/SpentForm";
import MonthPicker from "@/components/MonthPicker";
import {
  calculateMonthSum,
  filterSpentPerCategory,
  filterSpentPerMonth,
} from "@/utils/utils";
import spendingData from "@/spendingData.json";

export default function Home() {
  const spendingArray: Spent[] = spendingData.spendings;

  // in future globalSpending should be data from store or database
  const [globalSpending, setGlobalSpending] = useState(spendingArray);
  const [spending, setSpending] = useState(globalSpending);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const columns = spendingData.columns;

  function addSpent(spent: Spent) {
    if (parseInt(spent.date.split("-")[1]) === selectedMonth) {
      setSpending([...spending, spent]);
    }
    setGlobalSpending([...globalSpending, spent]);
  }

  function deleteBeiId(id: number) {
    setSpending((prevSpending) =>
      prevSpending.filter((spent) => spent.id !== id),
    );

    setGlobalSpending((prevSpending) =>
      prevSpending.filter((spent) => spent.id !== id),
    );
  }

  function editSpent(updatedSpent: Spent, id: number) {
    const index = globalSpending.findIndex((spent) => spent.id === id);

    const newSpending = [...globalSpending];
    newSpending[index] = updatedSpent;
    setGlobalSpending(newSpending);
  }

  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["all"]));
  function cancelSpentEdit() {
    filterSpents(selectedMonth, Array.from(selectedKeys));
  }

  function onEdit(
    event: ChangeEvent<HTMLInputElement> | DateValue,
    id: number,
  ) {
    if ("target" in event) {
      const { name, value } = event.target;

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

  function onSelect(event: ChangeEvent<HTMLSelectElement>, id: number) {
    const value = event.target.value;
    if (!value) return;
    setSpending((prevSpending) =>
      prevSpending.map((spent) =>
        spent.id === id ? { ...spent, category: value } : spent,
      ),
    );
  }

  function filterSpents(month: number, filter: string[]) {
    setSpending(filterSpentPerCategory(filter, month, globalSpending));
    setSelectedMonth(month);
  }

  function filterFunction(filter: string[]) {
    setSpending(filterSpentPerCategory(filter, selectedMonth, globalSpending));
    // setSelectedKeys(new Set(filter));
  }

  return (
    <>
      <h1>Finance overview</h1>
      <div>
        <MonthPicker
          filterSpents={filterSpents}
          setSelectedKeys={setSelectedKeys}
        />
        <p>
          In this month you spent:
          {calculateMonthSum(
            filterSpentPerMonth(selectedMonth, globalSpending),
          )}
          €
        </p>
        <p>
          In this category you spent:
          {calculateMonthSum(filterSpentPerMonth(selectedMonth, spending))}€
        </p>
      </div>
      <SpendingTable
        onEdit={onEdit}
        editSpent={editSpent}
        columns={columns}
        spending={spending}
        onDelete={deleteBeiId}
        cancelSpentEdit={cancelSpentEdit}
        onSelect={onSelect}
        filterFunction={filterFunction}
        selectedKeys={selectedKeys}
        setSelectedKeys={setSelectedKeys}
      />
      <SpentForm addSpent={addSpent} />
    </>
  );
}
