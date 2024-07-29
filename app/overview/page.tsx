import DatePicker from "@/components/DatePicker";
import Month from "@/components/Month";
export default function Home() {
  return (
    <div className="container mx-auto">
      <h1>Overview</h1>
      <div>
        <DatePicker />
      </div>
      <Month />
    </div>
  );
}
