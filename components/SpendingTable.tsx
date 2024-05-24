"use client";
import React, { useState } from "react";
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
import { Tooltip } from "@mui/material";
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
  const renderCell = React.useCallback((spent: Spent, columnKey: React.Key) => {
    const cellValue = spent[columnKey as keyof Spent];

    switch (columnKey) {
      case "subject":
        return <div>{spent.subject}</div>;
      case "date":
        return <div>{spent.date}</div>;
      case "spent":
        return <div>{spent.spent}</div>;
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details" title="d">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                show
              </span>
            </Tooltip>
            <Tooltip content="Edit spending" title="h">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                edit
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete spending" title="Delete">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                delete {spent.id}
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <h1>Finance overview</h1>
      <SpentForm addSpent={addSpent} />
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              align={column.key === "actions" ? "center" : "start"}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={spending}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
