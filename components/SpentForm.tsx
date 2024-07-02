import { ChangeEvent, useState } from "react";
import { Button } from "@nextui-org/button";
import { DatePicker, Input, Select, SelectItem } from "@nextui-org/react";
import { Spent, SpentCategory } from "@/types/Spent";
import {
  DateValue,
  parseDate,
  today,
  getLocalTimeZone,
} from "@internationalized/date";
interface spentFormProps {
  addSpent: (spent: Spent) => void;
}

export default function SpentForm({ addSpent }: spentFormProps) {
  const [spendingCounter, setSpendingCounter] = useState(4);
  const [formData, setFormData] = useState({
    subject: "Poison",
    date: today(getLocalTimeZone()).toString(),
    spent: "10",
    category: SpentCategory[0],
    id: spendingCounter,
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleAddSpent() {
    const newSpent = { ...formData, id: spendingCounter };
    addSpent(newSpent);
    setSpendingCounter(spendingCounter + 1);
    setFormData({
      subject: "Groceries",
      date: today(getLocalTimeZone()).toString(),
      spent: "20",
      id: spendingCounter + 1,
      category: SpentCategory[1],
    });
  }
  function onSelect(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    if (!value) return;
    setFormData({ ...formData, category: value });
  }
  function handeDataPick(date: DateValue) {
    setFormData({ ...formData, date: date.toString() });
  }

  return (
    <div className="border-1 p-4">
      <div className="pb-2 flex flex-wrap md:flex-nowrap gap-4">
        <Input
          value={formData.spent}
          type="number"
          onChange={handleChange}
          label="Amount of money"
          placeholder="Enter how much you spent"
          name="spent"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">€</span>
            </div>
          }
        />
        <Input
          onChange={handleChange}
          value={formData.subject}
          label="Subject"
          placeholder="Enter on what you spent"
          name="subject"
        />
        <DatePicker
          onChange={handeDataPick}
          value={parseDate(formData.date)}
          label="Spending date"
          name="date"
        />
        <Select
          label="Spent Category"
          placeholder="Select a category"
          className="max-w-xs"
          onChange={onSelect}
          selectedKeys={[formData.category]}
        >
          {SpentCategory.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </Select>
      </div>
      <Button onClick={handleAddSpent} color="primary">
        Add spent
      </Button>
    </div>
  );
}
