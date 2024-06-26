import { ChangeEvent, useState } from "react";
import { Button } from "@nextui-org/button";
import { DatePicker, Input } from "@nextui-org/react";
import { Spent } from "@/types/Spent";
import { DateValue, parseDate } from "@internationalized/date";

interface spentFormProps {
  addSpent: (spent: Spent) => void;
}

export default function SpentForm({ addSpent }: spentFormProps) {
  const [spendingCounter, setSpendingCounter] = useState(4);
  const [formData, setFormData] = useState({
    subject: "poison",
    date: "2024-06-25",
    spent: "0",
    id: spendingCounter,
  } as Spent);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleAddSpent() {
    const newSpent = { ...formData, id: spendingCounter };
    addSpent(newSpent);
    setSpendingCounter(spendingCounter + 1);
    setFormData({
      subject: "",
      date: "2024-06-26",
      spent: "",
      id: spendingCounter + 1,
    });
  }

  function handeDataPick(date: DateValue) {
    setFormData({ ...formData, date: date.toString() });
  }

  return (
    <div className="border-1 p-4">
      <div className="pb-2 flex flex-wrap md:flex-nowrap gap-4">
        <Input
          value={formData.spent}
          onChange={handleChange}
          label="Amount of money"
          placeholder="Enter how much you spent"
          name="spent"
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
      </div>
      <Button onClick={handleAddSpent} color="primary">
        Add spent
      </Button>
    </div>
  );
}
