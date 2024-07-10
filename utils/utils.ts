import { Spent } from "@/types/Spent";
import spendingData2 from "@/spendingData.json";

export function filterSpentPerMonth(month: number, globalSpending: Spent[]) {
  return globalSpending.filter(
    (spent) => parseInt(spent.date.split("-")[1]) === month,
  );
}

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
  return spending.reduce((acc, spent) => acc + parseInt(spent.spent), 0);
}

export function loadSpending(month: number) {
  return spendingData2.month[month - 1].spending;
}
