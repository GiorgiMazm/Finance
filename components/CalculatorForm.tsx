"use client";
import { ChangeEvent, useState } from "react";
import { Button } from "@nextui-org/button";
import { Input, Select, SelectItem } from "@nextui-org/react";
import {
  calculateAdditionalContributions,
  calculateTimeFrame,
  calculateTotalAmount,
  formatNumberWithoutSpaces,
  formatNumberWithSpaces,
} from "@/utils/utils";

export default function CalculatorForm() {
  const periods = ["years", "months"];
  const calculatorTypes = ["amount", "additionalContributions", "timeFrame"];
  const [formData, setFormData] = useState({
    initialInvestment: "10 000",
    interestRate: "7",
    period: "10",
    periodType: periods[0],
    additionalContributions: "1 000",
    additionalContributionsPeriod: periods[1],
    totalAmount: "100 000",
  });

  const [isResult, setIsResult] = useState(false);
  const [result, setResult] = useState("0");
  const [calculatorType, setCalculatorType] = useState(calculatorTypes[0]);

  function isValid() {
    if (calculatorType === calculatorTypes[0]) {
      return !(formData.period === "" || formData.interestRate === "" || 0);
    } else if (calculatorType === calculatorTypes[1]) {
      return !(
        formData.period === "" ||
        formData.interestRate === "" ||
        0 ||
        formData.totalAmount === "" ||
        formData.initialInvestment === ""
      );
    } else if (calculatorType === calculatorTypes[2]) {
      return !(
        formData.interestRate === "" ||
        0 ||
        formData.totalAmount === ""
      );
    }
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    const inputValue = formatNumberWithoutSpaces(e.target.value);

    const formattedValue = formatNumberWithSpaces(String(inputValue));
    setFormData({ ...formData, [field]: formattedValue });
  };

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function calculate() {
    if (!isValid()) {
      setIsResult(false);
      return;
    }
    if (calculatorType === calculatorTypes[0]) {
      setResult(
        calculateTotalAmount({
          additionalContributionsPeriod: formData.additionalContributionsPeriod,
          annualInterestRate: parseInt(formData.interestRate),
          contribution:
            formatNumberWithoutSpaces(formData.additionalContributions) || 0,
          initialInvestment:
            formatNumberWithoutSpaces(formData.initialInvestment) || 0,
          periodType: formData.periodType,
          periods: parseInt(formData.period),
        }),
      );
    } else if (calculatorType === calculatorTypes[1]) {
      setResult(
        formatNumberWithSpaces(
          calculateAdditionalContributions({
            annualInterestRate: parseFloat(formData.interestRate),
            initialInvestment: formatNumberWithoutSpaces(
              formData.initialInvestment,
            ),
            periodType: formData.periodType,
            totalAmount: formatNumberWithoutSpaces(formData.totalAmount),

            periods: parseInt(formData.period),
          }),
        ),
      );
    } else if (calculatorType === calculatorTypes[2]) {
      console.log("hi");
      setResult(
        calculateTimeFrame({
          annualInterestRate: parseFloat(formData.interestRate),
          initialInvestment: formatNumberWithoutSpaces(
            formData.initialInvestment,
          ),

          totalAmount: formatNumberWithoutSpaces(formData.totalAmount),
          additionalContributionsPeriod: formData.additionalContributionsPeriod,
          contribution: formatNumberWithoutSpaces(
            formData.additionalContributions,
          ),
        }),
      );
    }
    setIsResult(true);
  }

  function onSelect(event: ChangeEvent<HTMLSelectElement>, field: string) {
    const value = event.target.value;
    if (!value) return;
    setFormData({ ...formData, [field]: value });
  }
  return (
    <div className="container mx-auto gap-12">
      <div className="my-10">
        <h2>Change calculator&apos;s type</h2>
        {calculatorType !== calculatorTypes[0] && (
          <Button
            className="mr-6 mt-4 w-60"
            onClick={() => setCalculatorType(calculatorTypes[0])}
          >
            Total amount
          </Button>
        )}
        {calculatorType !== calculatorTypes[1] && (
          <Button
            className="mr-6 mt-4 w-60"
            onClick={() => setCalculatorType(calculatorTypes[1])}
          >
            Additional contributions
          </Button>
        )}
        {calculatorType !== calculatorTypes[2] && (
          <Button
            className="mr-6 mt-4 w-60"
            onClick={() => setCalculatorType(calculatorTypes[2])}
          >
            Time frame
          </Button>
        )}
      </div>
      <div className="border-1 p-4  flex flex-wrap md:flex-nowrap gap-4 flex-col md:w-1/3 justify-center">
        {calculatorType !== calculatorTypes[0] && (
          <Input
            isRequired
            value={formData.totalAmount}
            onChange={(event) => handleInputChange(event, "totalAmount")}
            label="Wanted amount:"
            placeholder="Enter how much you will to have"
            name="totalAmount"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">€</span>
              </div>
            }
          />
        )}
        <Input
          isRequired={calculatorType === calculatorTypes[1]}
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
          isRequired
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
        {calculatorType !== calculatorTypes[2] && (
          <div className="flex gap-5">
            <Input
              isRequired={calculatorType !== calculatorTypes[2]}
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
        )}
        {calculatorType !== calculatorTypes[1] && (
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
        )}
        <Button onClick={calculate} color="primary">
          Calculate
        </Button>
      </div>
      {isResult && <div>Result: {result}</div>}
    </div>
  );
}
