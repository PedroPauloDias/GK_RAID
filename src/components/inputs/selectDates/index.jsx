import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { format } from 'date-fns';

export default function SelectDates({ datas = [], variant, title, onChange }) {


  const variants = ["flat", "bordered", "underlined", "faded"];

  const handleChange = (date) => {
    onChange(date); // Passa a data selecionada para a função onChange
  };

  const formatDate = (dateString) => {
    // Formata a data usando date-fns
    return format(new Date(dateString), 'dd/MM/yyyy');
  };
  
  const selectItems = datas.map((data) => {
    const inicioFormatado = formatDate(data.startDate);
    const fimFormatado = formatDate(data.endDate);     
    
    return {
      label: `${inicioFormatado} - ${fimFormatado}`, // Concatena as datas de início e fim
      value: `${data.startDate} - ${data.endDate}` // Valor original
    };
  });
  
  return (
    <Select 
      variant={variant}
      label={title} 
      className="max-w-sm" 
      onChange={handleChange}
    >
      {selectItems.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </Select>
  );
}
