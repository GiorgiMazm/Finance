import { Spent } from "@/types/Spent";

export function filterSpentPerCategory(
  filter: string[],
  globalSpending: Spent[],
) {
  if (filter.includes("all")) return globalSpending;
  return globalSpending.filter((spent) =>
    filter.includes(spent.category.toLowerCase()),
  );
}

export function calculateMonthSum(spending: Spent[]) {
  return spending?.reduce((acc, spent) => acc + parseInt(spent.spent), 0);
}

export async function loadSpending(date: string) {
  return await getData(date);
}

async function getData(date: string) {
  console.log(process.env.NEXT_PUBLIC_BACKEND_URL, "hhhhhhhhh");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}api/date/${date}`,
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return (await res.json()) as Spent[];
}

export async function deleteSpending(id: number) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}api/spending/${id}`,
      {
        method: "DELETE",
      },
    );
  } catch (err) {
    console.log(err);
  }
}

export async function addSpending(spent: Partial<Spent>) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}api/spending/`,
    {
      method: "POST",
      body: JSON.stringify(spent),
    },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
}

export async function editSpending(spent: Spent) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}api/spending/`,
    {
      method: "PUT",
      body: JSON.stringify(spent),
    },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
}

export async function getYearSpending(year: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}api/spendings/${year}`,
    );
    console.log(res);
    return (await res.json()) as Spent[];
  } catch (error) {
    console.error(error);
  }
}

export const formatNumberWithSpaces = (value: string) => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
export const formatNumberWithoutSpaces = (value: string) => {
  const kek = parseFloat(value.replace(/\s/g, ""));
  return isNaN(kek) ? 0 : kek;
};

export function calculateTotalAmount({
  initialInvestment,
  annualInterestRate,
  periods,
  periodType,
  contribution,
  additionalContributionsPeriod,
}: {
  initialInvestment: number;
  annualInterestRate: number;
  periods: number;
  periodType: string;
  contribution: number;
  additionalContributionsPeriod: string;
}) {
  // Clean up the initial investment input and convert it to a float
  let monthlyContribution = contribution;
  if (additionalContributionsPeriod === "years")
    monthlyContribution = contribution / 12;
  let totalAmount = initialInvestment;
  const ratePerPeriod = annualInterestRate / 100 / 12;

  // Determine the total number of periods
  const isPeriodInYears = periodType === "years";
  const totalPeriods = isPeriodInYears ? periods * 12 : periods;

  for (let i = 1; i <= totalPeriods; i++) {
    totalAmount += monthlyContribution;
    totalAmount += totalAmount * ratePerPeriod;
  }

  return formatNumberWithSpaces(totalAmount.toFixed(2));
}

export function calculateAdditionalContributions({
  initialInvestment,
  annualInterestRate,
  periods,
  periodType,
  totalAmount,
}: {
  initialInvestment: number;
  annualInterestRate: number;
  periods: number;
  periodType: string;
  totalAmount: number;
}): string {
  // Convert interest rate to a monthly rate
  const ratePerPeriod = annualInterestRate / 100 / 12;

  // Determine the total number of periods
  const isPeriodInYears = periodType === "years";
  const totalPeriods = isPeriodInYears ? periods * 12 : periods;

  // Calculate the future value of the initial investment alone
  let futureValueWithoutContributions =
    initialInvestment * Math.pow(1 + ratePerPeriod, totalPeriods);

  // Calculate the additional monthly contributions required
  let monthlyContribution =
    ((totalAmount - futureValueWithoutContributions) * ratePerPeriod) /
    (Math.pow(1 + ratePerPeriod, totalPeriods) - 1);

  // Handle edge cases where no contributions are needed or contributions aren't possible
  if (monthlyContribution < 0 || isNaN(monthlyContribution)) {
    monthlyContribution = 0;
  }

  return formatNumberWithSpaces(monthlyContribution.toFixed(2));
}

export function calculateTimeFrame({
  initialInvestment,
  annualInterestRate,
  totalAmount,
  contribution,
  additionalContributionsPeriod,
}: {
  initialInvestment: number;
  annualInterestRate: number;
  contribution: number;
  additionalContributionsPeriod: string;
  totalAmount: number;
}): string {
  // Adjust the contribution to a monthly basis if the contributions are made yearly
  let monthlyContribution = contribution;
  if (additionalContributionsPeriod === "years") {
    monthlyContribution = contribution / 12;
  }

  // Convert the annual interest rate to a monthly rate
  const ratePerPeriod = annualInterestRate / 100 / 12;

  // Initialize variables to track the total amount and the number of months
  let currentAmount = initialInvestment;
  let months = 0;

  // Loop until the current amount reaches or exceeds the target amount
  while (currentAmount < totalAmount) {
    // Apply interest to the current amount
    currentAmount += currentAmount * ratePerPeriod;

    // Add the monthly contribution
    currentAmount += monthlyContribution;

    // Increment the month counter
    months++;
  }

  // Convert the total months to years and months
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  // Return the result as a string, e.g., "5 years and 3 months"
  return `${years} years and ${remainingMonths} months`;
}
