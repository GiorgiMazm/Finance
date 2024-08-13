"use client";
import { ChangeEvent, useState } from "react";
import { Button } from "@nextui-org/button";
import { Input, Select, SelectItem } from "@nextui-org/react";
import {
  calculateCompoundInterest,
  formatNumberWithoutSpaces,
  formatNumberWithSpaces,
} from "@/utils/utils";

export default function CalculatorForm() {
  const periods = ["years", "months"];
  const [formData, setFormData] = useState({
    initialInvestment: "10 000",
    interestRate: "7",
    period: "10",
    periodType: periods[0],
    additionalContributions: "1 000",
    additionalContributionsPeriod: periods[1],
  });

  const [isResult, setIsResult] = useState(false);
  const [result, setResult] = useState("0");

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    const inputValue = formatNumberWithoutSpaces(e.target.value);

    // If the input is a valid number, format it
    if (!isNaN(Number(inputValue)) && inputValue !== "") {
      const formattedValue = formatNumberWithSpaces(inputValue);
      setFormData({ ...formData, [field]: formattedValue });
    } else {
      setFormData({ ...formData, [field]: inputValue });
    }
  };

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function calculate() {
    const result = calculateCompoundInterest(
      parseFloat(formatNumberWithoutSpaces(formData.initialInvestment)),
      parseInt(formData.interestRate),
      parseInt(formData.period),
      formData.periodType,
      parseFloat(formatNumberWithoutSpaces(formData.additionalContributions)),
      formData.additionalContributionsPeriod,
    );
    setIsResult(true);
    setResult(result);
  }

  function onSelect(event: ChangeEvent<HTMLSelectElement>, field: string) {
    const value = event.target.value;
    if (!value) return;
    setFormData({ ...formData, [field]: value });
  }

  return (
    <div className="container mx-auto flex my-8 gap-12">
      <div className="border-1 p-4  flex flex-wrap md:flex-nowrap gap-4 flex-col md:w-1/3 justify-center">
        <Input
          value={formData.initialInvestment}
          onChange={(event) => handleInputChange(event, "initialInvestment")}
          label="Initial Investment:"
          placeholder="Enter how much you will invest initially"
          name="initialInvestment"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">€</span>
            </div>
          }
        />
        <Input
          onChange={handleChange}
          value={formData.interestRate}
          label="interestRate"
          type="number"
          placeholder="Predicted Interest Rate per year"
          name="interestRate"
          endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">%</span>
            </div>
          }
        />
        <div className="flex gap-5">
          <Input
            onChange={handleChange}
            value={formData.period}
            type="number"
            label="Period"
            placeholder="period"
            name="period"
          />

          <Select
            label="Type"
            className="max-w-xs"
            defaultSelectedKeys={[formData.periodType]}
            disallowEmptySelection
            onChange={(e) => onSelect(e, "periodType")}
          >
            {periods.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="flex gap-5">
          <Input
            type="text"
            onChange={(event) =>
              handleInputChange(event, "additionalContributions")
            }
            value={formData.additionalContributions}
            label="Additional Contributions"
            placeholder="How much you will be contrinuting montly/annually?"
            name="additionalContributions"
          />
          <Select
            label="Contributions per"
            onChange={(e) => onSelect(e, "additionalContributionsPeriod")}
            className="max-w-xs"
            defaultSelectedKeys={[formData.additionalContributionsPeriod]}
            disallowEmptySelection
          >
            {periods.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </Select>
        </div>
        <Button onClick={calculate} color="primary">
          Calculate
        </Button>
      </div>
      {isResult && <div>Result: {result}</div>}
    </div>
  );
}
