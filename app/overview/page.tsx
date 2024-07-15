import MonthPicker from "@/components/MonthPicker";
import Month from "@/components/Month";
export default function Home() {
  return (
    <>
      <h1>Finance Overview</h1>
      <div>
        <MonthPicker />
      </div>
      <Month />
    </>
  );
}
