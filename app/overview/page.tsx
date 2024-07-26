import DatePicker from "@/components/DatePicker";
import Month from "@/components/Month";
export default function Home() {
  return (
    <>
      <h1>Finance Overview</h1>
      <div>
        <DatePicker />
      </div>
      <Month />
    </>
  );
}
