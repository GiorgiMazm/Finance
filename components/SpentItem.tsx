import { Spent } from "@/types/Spent";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// no use for now
export default function SpentItem({ subject, spent, date }: Spent) {
  return (
    <>
      <tr>
        <td>{subject}</td>
        <td>{date}</td>
        <td>{spent}$</td>
        <DeleteOutlineOutlinedIcon className="cursor-pointer" />
        <EditOutlinedIcon className="cursor-pointer" />
      </tr>
    </>
  );
}
