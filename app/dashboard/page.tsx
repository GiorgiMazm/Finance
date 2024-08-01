import BarChart from "@/components/BarChart";
import PieChart from "@/components/PieChart";

export default function Dashboard() {
  const spending = [
    // January
    {
      id: 1,
      user_id: 1,
      subject: "Rent",
      date: "2024-01-05",
      spent: "850.00",
      category: "Flat",
    },
    {
      id: 2,
      user_id: 1,
      subject: "Gym Membership",
      date: "2024-01-10",
      spent: "505.00",
      category: "Sport",
    },
    {
      id: 3,
      user_id: 1,
      subject: "Groceries",
      date: "2024-01-15",
      spent: "20.00",
      category: "Food",
    },
    // February
    {
      id: 4,
      user_id: 1,
      subject: "Rent",
      date: "2024-02-05",
      spent: "830.00",
      category: "Flat",
    },
    {
      id: 5,
      user_id: 1,
      subject: "Yoga Classes",
      date: "2024-02-10",
      spent: "45.00",
      category: "Sport",
    },
    {
      id: 6,
      user_id: 1,
      subject: "Groceries",
      date: "2024-02-15",
      spent: "180.00",
      category: "Food",
    },
    // March
    {
      id: 7,
      user_id: 1,
      subject: "Rent",
      date: "2024-03-05",
      spent: "820.00",
      category: "Flat",
    },
    {
      id: 8,
      user_id: 1,
      subject: "Swimming Classes",
      date: "2024-03-10",
      spent: "7.00",
      category: "Sport",
    },
    {
      id: 9,
      user_id: 1,
      subject: "Groceries",
      date: "2024-03-15",
      spent: "20.00",
      category: "Food",
    },
    // April
    {
      id: 10,
      user_id: 1,
      subject: "Rent",
      date: "2024-04-05",
      spent: "60.00",
      category: "Flat",
    },
    {
      id: 11,
      user_id: 1,
      subject: "Fitness Equipment",
      date: "2024-04-10",
      spent: "10.00",
      category: "Sport",
    },
    {
      id: 12,
      user_id: 1,
      subject: "Groceries",
      date: "2024-04-15",
      spent: "200.00",
      category: "Food",
    },
    // May
    {
      id: 13,
      user_id: 1,
      subject: "Rent",
      date: "2024-05-05",
      spent: "860.00",
      category: "Flat",
    },
    {
      id: 14,
      user_id: 1,
      subject: "Gym Membership",
      date: "2024-05-10",
      spent: "60.00",
      category: "Sport",
    },
    {
      id: 15,
      user_id: 1,
      subject: "Groceries",
      date: "2024-05-15",
      spent: "190.00",
      category: "Food",
    },
    // June
    {
      id: 16,
      user_id: 1,
      subject: "Rent",
      date: "2024-06-05",
      spent: "840.00",
      category: "Flat",
    },
    {
      id: 17,
      user_id: 1,
      subject: "Yoga Classes",
      date: "2024-06-10",
      spent: "50.00",
      category: "Sport",
    },
    {
      id: 18,
      user_id: 1,
      subject: "Groceries",
      date: "2024-06-15",
      spent: "210.00",
      category: "Food",
    },
    // July
    {
      id: 19,
      user_id: 1,
      subject: "Rent",
      date: "2024-07-05",
      spent: "830.00",
      category: "Flat",
    },
    {
      id: 20,
      user_id: 1,
      subject: "Swimming Classes",
      date: "2024-07-10",
      spent: "75.00",
      category: "Sport",
    },
    {
      id: 21,
      user_id: 1,
      subject: "Groceries",
      date: "2024-07-15",
      spent: "230.00",
      category: "Food",
    },
    // August
    {
      id: 22,
      user_id: 1,
      subject: "Rent",
      date: "2024-08-05",
      spent: "820.00",
      category: "Flat",
    },
    {
      id: 23,
      user_id: 1,
      subject: "Fitness Equipment",
      date: "2024-08-10",
      spent: "110.00",
      category: "Sport",
    },
    {
      id: 24,
      user_id: 1,
      subject: "Groceries",
      date: "2024-08-15",
      spent: "220.00",
      category: "Food",
    },
    // September
    {
      id: 25,
      user_id: 1,
      subject: "Rent",
      date: "2024-09-05",
      spent: "850.00",
      category: "Flat",
    },
    {
      id: 26,
      user_id: 1,
      subject: "Gym Membership",
      date: "2024-09-10",
      spent: "65.00",
      category: "Sport",
    },
    {
      id: 27,
      user_id: 1,
      subject: "Groceries",
      date: "2024-09-15",
      spent: "240.00",
      category: "Food",
    },
    // October
    {
      id: 28,
      user_id: 1,
      subject: "Rent",
      date: "2024-10-05",
      spent: "860.00",
      category: "Flat",
    },
    {
      id: 29,
      user_id: 1,
      subject: "Yoga Classes",
      date: "2024-10-10",
      spent: "55.00",
      category: "Sport",
    },
    {
      id: 30,
      user_id: 1,
      subject: "Groceries",
      date: "2024-10-15",
      spent: "210.00",
      category: "Food",
    },
    // November
    {
      id: 31,
      user_id: 1,
      subject: "Rent",
      date: "2024-11-05",
      spent: "870.00",
      category: "Flat",
    },
    {
      id: 32,
      user_id: 1,
      subject: "Swimming Classes",
      date: "2024-11-10",
      spent: "80.00",
      category: "Sport",
    },
    {
      id: 33,
      user_id: 1,
      subject: "Groceries",
      date: "2024-11-15",
      spent: "230.00",
      category: "Food",
    },
    // December
    {
      id: 34,
      user_id: 1,
      subject: "Rent",
      date: "2024-12-05",
      spent: "880.00",
      category: "Flat",
    },
    {
      id: 35,
      user_id: 1,
      subject: "Fitness Equipment",
      date: "2024-12-10",
      spent: "130.00",
      category: "Sport",
    },
    {
      id: 36,
      user_id: 1,
      subject: "Groceries",
      date: "2024-12-15",
      spent: "250.00",
      category: "Food",
    },
  ];

  return (
    <div className="container mx-auto">
      <h1>Finance Dashboard</h1>
      <div className="flex flex-wrap justify-between">
        <div className="w-3/4">
          <h2>Monthly Spending by Category</h2>
          <BarChart spending={spending} />
        </div>
        <div className="self-center">
          <h2>Spending Distribution</h2>
          <PieChart spending={spending} />
        </div>
      </div>
    </div>
  );
}
