import React, { ChangeEvent, useEffect, useState } from "react";
import { Spent } from "@/types/Spent";
import { DateValue } from "@internationalized/date";
import SpendingTable from "@/components/SpendingTable";
import SpentForm from "@/components/SpentForm";
import { calculateMonthSum, filterSpentPerCategory } from "@/utils/utils";
import spendingData2 from "@/spendingData.json";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSpending,
  addSpending,
  editSpending,
  initialStateInterface,
} from "@/lib/state/appSLice";

export default function Month({}: {}) {
  const dispatch = useDispatch();
  const { selectedMonth, spending } = useSelector(
    (state: initialStateInterface) => state,
  );

  useEffect(() => {
    setSelectedKeys(new Set(["all"]));
    setFilteredSpending(spending);
  }, [selectedMonth]);

  const [filteredSpending, setFilteredSpending] = useState(spending);
  const columns = spendingData2.columns;

  function addSpent(spent: Spent) {
    if (parseInt(spent.date.split("-")[1]) === selectedMonth) {
      setFilteredSpending([...spending, spent]);
      dispatch(addSpending(spent));
    }
  }

  function deleteBeiId(id: number) {
    setFilteredSpending((prevSpending) =>
      prevSpending.filter((spent) => spent.id !== id),
    );
    dispatch(deleteSpending(id));
  }

  function editSpent(updatedSpent: Spent, id: number) {
    const index = spending.findIndex((spent) => spent.id === id);
    dispatch(editSpending({ id: id, updatedSpent: updatedSpent }));
    const newSpending = [...spending];
    newSpending[index] = updatedSpent;
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
          {calculateMonthSum(spending)}€
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
