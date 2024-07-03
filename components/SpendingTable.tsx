import { Spent, SpentCategory } from "@/types/Spent";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  DatePicker,
  Select,
  SelectItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
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
  onSelect: (event: ChangeEvent<HTMLSelectElement>, id: number) => void;
  filterFunction: (filter: string[]) => void;
}

export default function SpendingTable({
  spending,
  columns,
  onDelete,
  editSpent,
  onEdit,
  cancelSpentEdit,
  onSelect,
  filterFunction,
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
              type="number"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">€</span>
                </div>
              }
            />
          );
        } else return `${cellValue}€`;

      case "category":
        if (editingId === spent.id) {
          return (
            <Select
              label="Spent Category"
              placeholder="Select a category"
              className="max-w-xs"
              onChange={(event) => onSelect(event, spent.id)}
              selectedKeys={[spent.category]}
            >
              {SpentCategory.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </Select>
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

  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["all"]));

  const selectedValue = React.useMemo(() => {
    let keysArray = Array.from(selectedKeys);

    if (selectedKeys.size > 1 && keysArray.includes("all")) {
      if (keysArray[0] === "all") {
        keysArray = keysArray.slice(1);
        setSelectedKeys(new Set(keysArray));
      } else {
        keysArray = ["all"];
        setSelectedKeys(new Set(["all"]));
      }
    }
    filterFunction(keysArray);
    return keysArray.join(", ").replaceAll("_", " ");
  }, [selectedKeys]);

  return (
    <Table aria-label="Spending table">
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key}>
            {column.key === "category" ? (
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered" className="capitalize">
                    {selectedValue}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Multiple selection example"
                  variant="flat"
                  closeOnSelect={false}
                  disallowEmptySelection
                  selectionMode="multiple"
                  selectedKeys={selectedKeys}
                  onSelectionChange={(h: any) => setSelectedKeys(h)}
                >
                  <DropdownItem key="all">All</DropdownItem>
                  <DropdownItem key="food">Food</DropdownItem>
                  <DropdownItem key="flat">Flat</DropdownItem>
                  <DropdownItem key="sport">Sport</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              column.label
            )}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {spending.map((item) => (
          <TableRow key={item.id}>
            {columns.map((column) => (
              <TableCell className="w-[200px]" key={column.key}>
                {renderCell(item, column.key)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
