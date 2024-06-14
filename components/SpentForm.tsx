import { ChangeEvent, useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/react";
import { Spent } from "@/types/Spent";

interface spentFormProps {
  addSpent: (spent: Spent) => void;
}

export default function SpentForm({ addSpent }: spentFormProps) {
  const [spendingCounter, setSpendingCounter] = useState(4);
  const [formData, setFormData] = useState({
    subject: "poison",
    date: "tomorrow",
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
      date: "",
      spent: "",
      id: spendingCounter + 1,
    });
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
        <Input
          onChange={handleChange}
          value={formData.date}
          label="Spending date"
          placeholder="Enter when you spent"
          name="date"
        />
      </div>
      <Button onClick={handleAddSpent} color="primary">
        Add spent
      </Button>
    </div>
  );
}
