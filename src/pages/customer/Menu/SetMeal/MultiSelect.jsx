import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";

const MultiSelect = ({ label, options, value, onChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={value}
        onChange={onChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) =>
          selected
            .map((val) => {
              const opt = options.find((o) => o.value === val);
              return opt ? opt.label : val;
            })
            .join(", ")
        }
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Checkbox checked={value.indexOf(option.value) > -1} />
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelect;
