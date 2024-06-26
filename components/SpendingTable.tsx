import { Spent } from "@/types/Spent";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  DatePicker,
} from "@nextui-org/react";
import React, { ChangeEvent, useState } from "react";
import { Button } from "@nextui-org/button";
import { DateValue, parseDate } from "@internationalized/date";

interface SpendingTableProps {
  spending: Spent[];
  columns: { key: string; label: string }[];
  onDelete: (id: number) => void;
  editSpent: (spent: Spent, id: number) => void;
  onEdit: (
    event: ChangeEvent<HTMLInputElement> | DateValue,
    id: number,
  ) => void;
  cancelSpentEdit: () => void;
}

export default function SpendingTable({
  spending,
  columns,
  onDelete,
  editSpent,
  onEdit,
  cancelSpentEdit,
}: SpendingTableProps) {
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleEditClick = (id: number) => {
    setEditingId(id);
  };

  const handleSave = (id: number) => {
    const spent = spending.find((spentItem) => spentItem.id === id);
    if (!spent) return;
    editSpent(spent, id);
    setEditingId(null);
  };

  const handleCancel = () => {
    cancelSpentEdit();
    setEditingId(null);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | DateValue,
    id: number,
  ) => {
    onEdit(event, id);
  };

  function renderCell(spent: Spent, columnKey: React.Key) {
    const cellValue = spent[columnKey as keyof Spent];

    switch (columnKey) {
      case "subject":
        if (editingId === spent.id) {
          return (
            <Input
              className="w-full"
              value={spent.subject}
              name="subject"
              onChange={(event) => handleChange(event, spent.id)}
              placeholder={`Enter`}
            />
          );
        } else return cellValue;
      case "date":
        if (editingId === spent.id) {
          return (
            <DatePicker
              className="w-full"
              value={parseDate(spent.date)}
              name="date"
              onChange={(event) => handleChange(event, spent.id)}
            />
          );
        } else return cellValue.toString();
      case "spent":
        if (editingId === spent.id) {
          return (
            <Input
              className="w-full"
              value={spent.spent}
              name="spent"
              onChange={(event) => handleChange(event, spent.id)}
              placeholder={`Enter`}
            />
          );
        } else return cellValue;
      case "actions":
        if (editingId === spent.id) {
          return (
            <>
              <Button className="mr-3" onClick={() => handleSave(spent.id)}>
                Save
              </Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </>
          );
        } else
          return (
            <>
              <Button
                className="mr-3"
                onClick={() => handleEditClick(spent.id)}
              >
                Edit
              </Button>
              <Button onClick={() => onDelete(spent.id)}>Delete</Button>
            </>
          );
      default:
        return cellValue;
    }
  }

  return (
    <Table aria-label="Spending table">
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {spending.map((item) => (
          <TableRow key={item.id}>
            {columns.map((column) => (
              <TableCell key={column.key}>
                {renderCell(item, column.key)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
