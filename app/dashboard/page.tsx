import BarChart from "@/components/BarChart";
import PieChart from "@/components/PieChart";
import { getYearSpending } from "@/utils/utils";

export default async function Dashboard() {
  let spending = await getYearSpending("2024");

  return (
    <div className="container mx-auto">
      <h1 className="text-center text-3xl">Finance Dashboard</h1>
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
