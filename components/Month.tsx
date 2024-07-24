"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Spent } from "@/types/Spent";
import { DateValue } from "@internationalized/date";
import SpendingTable from "@/components/SpendingTable";
import SpentForm from "@/components/SpentForm";
import {
  addSpending1,
  calculateMonthSum,
  deleteSpending1,
  editSpending1,
  filterSpentPerCategory,
  loadSpending,
} from "@/utils/utils";
import spendingData2 from "@/spendingData.json";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSpending,
  addSpending,
  editSpending,
  initialStateInterface,
  setSpending,
} from "@/lib/state/appSLice";

export default function Month() {
  const dispatch = useDispatch();
  const selectedMonth = useSelector(
    (state: initialStateInterface) => state.selectedMonth,
  );
  const spending = useSelector(
    (state: initialStateInterface) => state.spending,
  );

  const [filteredSpending, setFilteredSpending] = useState<Spent[]>([]);
  const [selectedKeys, setSelectedKeys] = useState(new Set(["all"]));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await loadSpending(selectedMonth);
        dispatch(setSpending(fetchedData));
      } catch (error) {
        console.error("Failed to load spending data:", error);
      }
    };

    fetchData();
  }, [selectedMonth, dispatch]);

  useEffect(() => {
    setSelectedKeys(new Set(["all"]));
    setFilteredSpending(spending);
  }, [spending, selectedMonth]);

  const columns = spendingData2.columns;

  function addSpent(spent: Spent) {
    if (parseInt(spent.date.split("-")[1]) === selectedMonth) {
      dispatch(addSpending(spent));
    }
    addSpending1(spent);
  }

  function deleteBeiId(id: number) {
    deleteSpending1(id);
    dispatch(deleteSpending(id));
  }

  function editSpent(updatedSpent: Spent, id: number) {
    dispatch(editSpending({ id, updatedSpent }));
    editSpending1(updatedSpent);
  }

  function cancelSpentEdit() {
    filterSpents(selectedMonth, Array.from(selectedKeys));
  }

  function onEdit(
    event: ChangeEvent<HTMLInputElement> | DateValue,
    id: number,
  ) {
    if ("target" in event) {
      const { name, value } = event.target;
      setFilteredSpending((prevSpending) =>
        prevSpending.map((spent) =>
          spent.id === id ? { ...spent, [name]: value } : spent,
        ),
      );
    } else {
      setFilteredSpending((prevSpending) =>
        prevSpending.map((spent) =>
          spent.id === id ? { ...spent, date: event.toString() } : spent,
        ),
      );
    }
  }

  function onSelect(event: ChangeEvent<HTMLSelectElement>, id: number) {
    const value = event.target.value;
    if (!value) return;
    setFilteredSpending((prevSpending) =>
      prevSpending.map((spent) =>
        spent.id === id ? { ...spent, category: value } : spent,
      ),
    );
  }

  function filterSpents(month: number, filter: string[]) {
    setFilteredSpending(filterSpentPerCategory(filter, spending));
  }

  function filterFunction(filter: string[]) {
    setFilteredSpending(filterSpentPerCategory(filter, spending));
    // setSelectedKeys(new Set(filter));
  }

  return (
    <>
      <div>
        <p>
          In this month you spent:
          {calculateMonthSum(spending)}€
        </p>
        <p>
          In this category you spent:
          {calculateMonthSum(filteredSpending)}€
        </p>
      </div>
      <SpendingTable
        onEdit={onEdit}
        editSpent={editSpent}
        columns={columns}
        spending={filteredSpending}
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
