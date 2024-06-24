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

interface SpendingTableProps {
  spendingArray: Spent[];
  columns: { key: string; label: string }[];
  onDelete: (id: number) => void;
  editSpent: (spent: Spent, id: number) => void;
}

export default function SpendingTable({
  spendingArray,
  columns,
  onDelete,
  editSpent,
}: SpendingTableProps) {
  const [editingId, setEditingId] = useState<number | null>(null);

  const [spending, setSpending] = useState(spendingArray);

  function onEdit(event: ChangeEvent<HTMLInputElement>, id: number) {
    console.log(event, id);
    const { name, value } = event.target;
    setSpending((prevSpending) =>
      prevSpending.map((spent) =>
        spent.id === id ? { ...spent, [name]: value } : spent,
      ),
    );
  }

  const handleEditClick = (id: number) => {
    setEditingId(id);
  };

  function handleDelete(id: number) {
    setSpending((prevSpending) =>
      prevSpending.filter((spent) => spent.id !== id),
    );
    onDelete(id);
  }

  const handleSave = (id: number) => {
    const spent = spending.find((spentItem) => spentItem.id === id);
    if (!spent) return;
    editSpent(spent, id);
    setEditingId(null);
  };

  const handleCancel = (id: number) => {
    setSpending(spendingArray);
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
                      <button onClick={() => handleSave(item.id)}>Save</button>
                      <button onClick={() => handleCancel(item.id)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(item.id)}>
                        Edit
                      </button>
                      <button onClick={() => handleDelete(item.id)}>
                        Delete
                      </button>
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
