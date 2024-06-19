"use client";
import { Spent } from "@/types/Spent";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
} from "@nextui-org/react";
import { Tooltip } from "@mui/material";
import { ChangeEvent, Key, useCallback, useEffect, useState } from "react";

interface SpendingTableProps {
  spending: Spent[];
  columns: { key: string; label: string }[];
  deleteBeiId: any;
  editSpent: any;
}
export default function SpendingTable({
  spending,
  columns,
  deleteBeiId,
  editSpent,
}: SpendingTableProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>, id: number) {
    editSpent(event, id);
  }
  const [isVisible, setVisibility] = useState(false);

  function handleEdit(id: number) {
    setVisibility(!isVisible);
    console.log(isVisible);
  }

  const renderCell = useCallback((spent: Spent, columnKey: Key) => {
    const cellValue = spent[columnKey as keyof Spent];

    switch (columnKey) {
      case "subject":
        return (
          <div>
            {isVisible ? (
              <Input
                value={spent.subject}
                onChange={(event) => handleChange(event, spent.id)}
                placeholder="Enter on what you spent"
                name="subject"
              />
            ) : (
              <span>{spent.subject}</span>
            )}
          </div>
        );
      case "date":
        return (
          <div>
            <span>{spent.date}</span>
            <Input
              value={spent.date}
              onChange={(event) => handleChange(event, spent.id)}
              placeholder="Enter when you spent"
              name="date"
            />
          </div>
        );
      case "spent":
        return (
          <div>
            <span>{spent.spent}</span>
            <Input
              value={spent.spent}
              onChange={(event) => handleChange(event, spent.id)}
              placeholder="Enter how much you spent"
              name="spent"
            />
          </div>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit spending" title="h">
              <span
                onClick={() => handleEdit(spent.id)}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                edit
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete spending" title="Delete">
              <span
                onClick={() => deleteBeiId(spent.id)}
                className="text-lg text-danger cursor-pointer active:opacity-50"
              >
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
