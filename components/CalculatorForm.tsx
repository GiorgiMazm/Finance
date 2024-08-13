"use client";
import { ChangeEvent, useState } from "react";
import { Button } from "@nextui-org/button";
import { Input, Select, SelectItem } from "@nextui-org/react";

export default function CalculatorForm() {
  const periods = ["years", "months"];
  const [formData, setFormData] = useState({
    initialInvestment: "10 000",
    interestRate: "7",
    period: "10",
    periodType: periods[0],
    additionalContributions: "1000",
    additionalContributionsPeriod: periods[1],
  });

  const [isResult, setIsResult] = useState(false);
  const [result, setResult] = useState("0");
  const handleInputChange = (e: { target: { value: string } }) => {
    const inputValue = e.target.value.replace(/\s/g, "");

    // If the input is a valid number, format it
    if (!isNaN(Number(inputValue)) && inputValue !== "") {
      const formattedValue = formatNumberWithSpaces(inputValue);
      setFormData({ ...formData, initialInvestment: formattedValue });
    } else {
      setFormData({ ...formData, initialInvestment: inputValue });
    }
  };

  const formatNumberWithSpaces = (value: string) => {
    // Convert the number to a string and use a regular expression to add spaces
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }
  function calculateCompoundInterest(
    initialInvestment: string,
    annualInterestRate: number,
    periods: number,
    periodType: string,
    contribution: number,
    additionalContributionsPeriod: string,
  ) {
    // Clean up the initial investment input and convert it to a float
    let monthlyContribution = contribution;
    if (additionalContributionsPeriod === "years")
      monthlyContribution = contribution / 12;
    let totalAmount = parseFloat(initialInvestment.replace(/\s/g, ""));
    const ratePerPeriod = annualInterestRate / 100 / 12;

    // Determine the total number of periods
    const isPeriodInYears = periodType === "years";
    const totalPeriods = isPeriodInYears ? periods * 12 : periods;

    for (let i = 1; i <= totalPeriods; i++) {
      totalAmount += monthlyContribution;
      totalAmount += totalAmount * ratePerPeriod;
    }

    return totalAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  function calculate() {
    const result = calculateCompoundInterest(
      formData.initialInvestment,
      parseInt(formData.interestRate),
      parseInt(formData.period),
      formData.periodType,
      parseInt(formData.additionalContributions),
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
          onChange={handleInputChange}
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
            type="number"
            onChange={handleChange}
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
