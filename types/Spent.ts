export interface Spent {
  subject: string;
  date: string;
  spent: string;
  id: number;
}

export interface Month {
  spending: Spent[];
  name: string;
  sum: number;
}
