"use client";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Spent } from "@/types/Spent";
import { DateValue } from "@internationalized/date";
import SpendingTable from "@/components/SpendingTable";
import {
  calculateMonthSum,
  deleteSpending,
  editSpending,
  filterSpentPerCategory,
  loadSpending,
} from "@/utils/utils";
import spendingData2 from "@/spendingData.json";
import { useDispatch, useSelector } from "react-redux";
import { initialStateInterface, setSpending } from "@/lib/state/appSLice";

export default function Month() {
  const dispatch = useDispatch();
  const selectedDate = useSelector(
    (state: initialStateInterface) => state.selectedDate,
  );
  const spending = useSelector(
    (state: initialStateInterface) => state.spending,
  );

  const [filteredSpending, setFilteredSpending] = useState<Spent[]>([]);
  const [selectedKeys, setSelectedKeys] = useState(new Set(["all"]));
  const [isDataChanged, setIsDataChanged] = useState(false);

  const deleteSpent = useCallback(async (id: number) => {
    await deleteSpending(id);
    setIsDataChanged((prev) => !prev);
  }, []);

  const editSpent = useCallback(async (updatedSpent: Spent) => {
    await editSpending(updatedSpent);
    setIsDataChanged((prev) => !prev);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await loadSpending(selectedDate);
        dispatch(setSpending(fetchedData));
      } catch (error) {
        console.error("Failed to load spending data:", error);
      }
    };

    fetchData();
  }, [selectedDate, isDataChanged]);

  useEffect(() => {
    setSelectedKeys(new Set(["all"]));
    setFilteredSpending(spending);
  }, [spending, selectedDate]);

  const columns = spendingData2.columns;

  function cancelSpentEdit() {
    filterSpents(Array.from(selectedKeys));
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

  function filterSpents(filter: string[]) {
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
        {!selectedKeys.has("all") && (
          <p>
            In this category you spent:
            {calculateMonthSum(filteredSpending)}€
          </p>
        )}
      </div>
      <SpendingTable
        onEdit={onEdit}
        editSpent={editSpent}
        columns={columns}
        spending={filteredSpending}
        onDelete={deleteSpent}
        cancelSpentEdit={cancelSpentEdit}
        onSelect={onSelect}
        filterFunction={filterFunction}
        selectedKeys={selectedKeys}
        setSelectedKeys={setSelectedKeys}
      />
    </>
  );
}
