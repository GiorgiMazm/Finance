import { Input } from "@nextui-org/react";
import React, { ChangeEvent } from "react";

interface SpentItemProps {
  id: number;
  columnKey: string;
  value: string;
  isEditing: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SpentItem: React.FC<SpentItemProps> = ({
  value,
  isEditing,
  onChange,
}) => {
  return (
    <div>
      {isEditing ? (
        <Input value={value} onChange={onChange} placeholder="Enter value" />
      ) : (
        <span>{value}</span>
      )}
    </div>
  );
};

export default SpentItem;
