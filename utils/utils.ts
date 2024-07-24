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

export async function loadSpending(month: number) {
  const data = await getData(month);
  console.log(data);
  return data;
}

async function getData(month: number) {
  const res = await fetch(`http://localhost:3001/api/month/${month}`);
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
