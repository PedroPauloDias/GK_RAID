
import React from "react";
import { Input } from "@nextui-org/react";

export default function InputCustom({ type, title, value, onChange }) {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Input
        type={type}
        label={title}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
