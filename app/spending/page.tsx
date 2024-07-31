import DatePicker from "@/components/DatePicker";
import Month from "@/components/Month";
export default function Spending() {
  return (
    <div className="container mx-auto">
      <h1>Spending</h1>
      <div>
        <DatePicker />
      </div>
      <Month />
    </div>
  );
}
