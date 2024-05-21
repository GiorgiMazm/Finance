import { Spent } from "@/types/Spent";

export default function SpentItem({ subject, spent, date }: Spent) {
  return (
    <>
      <tr>
        <td>{subject}</td>
        <td>{date}</td>
        <td>{spent}$</td>
      </tr>
    </>
  );
}
