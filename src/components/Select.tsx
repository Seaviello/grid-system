import React from "react";

export const Select = ({
  options,
  onChange
}: {
  options: string[];
  onChange: (value: string) => void;
}) => {
  return (
    <select onChange={e => onChange(e.target.value)}>
      {options.map(el => (
        <option key={el} value={el}>
          {el}
        </option>
      ))}
    </select>
  );
};
