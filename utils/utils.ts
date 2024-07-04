import { Spent } from "@/types/Spent";

export function filterSpentPerMonth(month: number, globalSpending: Spent[]) {
  return globalSpending.filter(
    (spent) => parseInt(spent.date.split("-")[1]) === month,
  );
}

export function filterSpentPerCategory(
  filter: string[],
  selectedMonth: number,
  globalSpending: Spent[],
) {
  const filteredSpent = filterSpentPerMonth(selectedMonth, globalSpending);
  if (filter.includes("all")) {
    return filteredSpent;
  }
  return filteredSpent.filter((spent) =>
    filter.includes(spent.category.toLowerCase()),
  );
}

export function calculateMonthSum(spending: Spent[]) {
  return spending.reduce((acc, spent) => acc + parseInt(spent.spent), 0);
}
