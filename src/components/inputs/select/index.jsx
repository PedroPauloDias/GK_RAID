import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

export default function SelectCustom({ items, title, variant, onChange }) {
  const handleSelectChange = (event) => {
    const newValue = event.target.value;
    onChange(newValue);
  };

  return (
    <Select variant={variant} label={title} className="max-w-sm" onChange={handleSelectChange}>
      {items.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </Select>
  );
}
