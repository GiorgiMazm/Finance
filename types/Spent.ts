export interface Spent {
  subject: string;
  date: string;
  spent: string;
  id: number;
  category: string;
}

export interface Month {
  spending: Spent[];
  name: string;
  sum: number;
}

export const SpentCategory = [
  "Food",
  "Flat",
  "Sport",
  "Investment",
  "Entertainment",
];
