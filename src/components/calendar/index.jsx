'use client'
import React from "react";
import {RangeCalendar} from "@nextui-org/react";
import {today, getLocalTimeZone} from "@internationalized/date";

export default function Calendar() {
  let [value, setValue] = React.useState({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({weeks: 1}),
  });

  return (
    <RangeCalendar 
      aria-label="Date (Controlled)" 
      value={value} 
      onChange={setValue} 
    />
  );
}
