"use client";
import { useState } from "react";
import { Spent } from "@/types/Spent";
import SpentItem from "@/components/SpentItem";
import SpentForm from "@/components/SpentForm";

export default function Home() {
  const spendingArray: Spent[] = [
    {
      subject: "Apartment",
      date: "01.05.2024",
      spent: "800",
    },
    {
      subject: "Gym membership",
      date: "01.05.2024",
      spent: "25",
    },
    {
      subject: "Food for whole week",
      date: "03.05.2024",
      spent: "50",
    },
  ];

  function addSpent(spent: Spent) {
    setSpending([...spending, spent]);
  }

  const [spending, setSpending] = useState(spendingArray);
  return (
    <main className="container mx-auto">
      <h1>Finance overview</h1>
      <SpentForm addSpent={addSpent} />

      <div>
        <h2>Mai spending</h2>
        <table>
          <thead>
            <tr>
              <th>On what</th>
              <th>Age</th>
              <th>Money spent</th>
            </tr>
          </thead>
          <tbody>
            {spending.map((spent, index) => (
              <SpentItem
                key={index}
                subject={spent.subject}
                date={spent.date}
                spent={spent.spent}
              />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>Summe: 4000$</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </main>
  );
}
