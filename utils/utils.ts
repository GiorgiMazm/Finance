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
  const res = await fetch(`http://localhost:3001/api/date/${date}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return (await res.json()) as Spent[];
}

export async function deleteSpending1(id: number) {
  const res = await fetch(`http://localhost:3001/api/spending/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
}

export async function addSpending1(spent: Spent) {
  const res = await fetch(`http://localhost:3001/api/spending/`, {
    method: "POST",
    body: JSON.stringify(spent),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
}

export async function editSpending1(spent: Spent) {
  const res = await fetch(`http://localhost:3001/api/spending/`, {
    method: "PUT",
    body: JSON.stringify(spent),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
}
