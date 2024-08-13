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
  const data = await getData(date);
  return data;
}

async function getData(date: string) {
  const res = await fetch(`http://localhost:5555/api/date/${date}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return (await res.json()) as Spent[];
}

export async function deleteSpending1(id: number) {
  const res = await fetch(`http://localhost:5555/api/spending/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
}

export async function addSpending1(spent: Spent) {
  const res = await fetch(`http://localhost:5555/api/spending/`, {
    method: "POST",
    body: JSON.stringify(spent),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
}

export async function editSpending1(spent: Spent) {
  const res = await fetch(`http://localhost:5555/api/spending/`, {
    method: "PUT",
    body: JSON.stringify(spent),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
}

export async function getYearSpending(year: string) {
  const res = await fetch(`http://localhost:5555/api/spendings/${year}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  } else return (await res.json()) as Spent[];
}

export const formatNumberWithSpaces = (value: string) => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
export const formatNumberWithoutSpaces = (value: string) => {
  return value.replace(/\s/g, "");
};

export function calculateCompoundInterest(
  initialInvestment: number,
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
