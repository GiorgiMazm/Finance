"use client";
import { Spent } from "@/types/Spent";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Tooltip } from "@mui/material";
import { Key, useCallback } from "react";

interface SpendingTableProps {
  spending: Spent[];
  columns: { key: string; label: string }[];
  deleteBeiId: any;
}
export default function SpendingTable({
  spending,
  columns,
  deleteBeiId,
}: SpendingTableProps) {
  const renderCell = useCallback((spent: Spent, columnKey: Key) => {
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
            <Tooltip content="Edit spending" title="h">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
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
