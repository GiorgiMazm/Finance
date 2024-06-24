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
import { ChangeEvent, useState } from "react";
import { Button } from "@nextui-org/button";

interface SpendingTableProps {
  spending: Spent[];
  columns: { key: string; label: string }[];
  onDelete: (id: number) => void;
  editSpent: (spent: Spent, id: number) => void;
  onEdit: (event: ChangeEvent<HTMLInputElement>, id: number) => void;
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>, id: number) => {
    onEdit(event, id);
  };

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
                {editingId === item.id && column.key !== "actions" ? (
                  <Input
                    value={item[column.key as keyof Spent] as string}
                    name={column.key} // Added name attribute
                    onChange={(event) => handleChange(event, item.id)}
                    placeholder={`Enter ${column.label.toLowerCase()}`}
                  />
                ) : column.key === "actions" ? (
                  editingId === item.id ? (
                    <>
                      <Button
                        className="mr-3"
                        onClick={() => handleSave(item.id)}
                      >
                        Save
                      </Button>
                      <Button onClick={handleCancel}>Cancel</Button>
                    </>
                  ) : (
                    <>
                      <Button
                        className="mr-3"
                        onClick={() => handleEditClick(item.id)}
                      >
                        Edit
                      </Button>
                      <Button onClick={() => onDelete(item.id)}>Delete</Button>
                    </>
                  )
                ) : (
                  <span>{item[column.key as keyof Spent]}</span>
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
