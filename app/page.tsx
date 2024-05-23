"use client";
import { useState } from "react";
import { Spent } from "@/types/Spent";
import SpentForm from "@/components/SpentForm";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
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
    console.log(spendingArray);
    console.log(spent, "hh");
  }

  const [spending, setSpending] = useState(spendingArray);
  return (
    <main className="container mx-auto">
      <ThemeSwitcher />
      <h1>Finance overview</h1>
      <SpentForm addSpent={addSpent} />

      <div>
        <h2>Mai spending</h2>
        <Table aria-label="Example table with dynamic content">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={spending}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
