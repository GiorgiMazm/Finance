export interface Spent {
  subject: string;
  date: string;
  spent: string;
}

export interface Month {
  spending: Spent[];
  name: string;
  sum: number;
}
