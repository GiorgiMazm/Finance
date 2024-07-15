import { Month, Spent } from "@/types/Spent";

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

export async function loadSpending(month: number) {
  const data = await getData(month);
  console.log(data);
  return data?.spending;
}

async function getData(month: number) {
  const res = await fetch(`http://localhost:3001/api/month/${month}`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return (await res.json()) as Month;
}
