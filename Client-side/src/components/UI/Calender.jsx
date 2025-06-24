import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';
 function Calendar({onSelect , selected}) {

  return (
    <div className=" mx-auto p-5 bg-white rounded-lg shadow">
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={onSelect}
        modifiersClassNames={{
          selected: "bg-indigo-600 text-white rounded-full",
          today: "text-indigo-600",
        }}
        className="text-center"
        showOutsideDays
      />
    </div>
  );
}

export {Calendar}