import React from "react";
import {
  Autocomplete,
  Checkbox,
  TextField,
  FormControlLabel,
  ListItem,
} from "@mui/material";

const allergenOptions = [
  { label: "DAIRY", value: "dairy" },
  { label: "FISH", value: "fish" },
  { label: "PEANUTS", value: "peanuts" },
  { label: "NUTS", value: "nuts" },
  { label: "MUSTARD", value: "mustard" },
  { label: "VEG", value: "veg" },
  { label: "GLUTEN", value: "gluten" },
  { label: "SOYA", value: "soya" },
  { label: "EGGS", value: "eggs" },
  { label: "WHEAT", value: "wheat" },
  { label: "SHELLFISH", value: "shellfish" },
  { label: "CHILLI", value: "chilli" },
  { label: "VEGAN", value: "vegan" },
];
const AllergenSelector = ({ selectedAllergens, setSelectedAllergens }) => {
  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      options={allergenOptions}
      getOptionLabel={(option) => option.label}
      value={selectedAllergens}
      onChange={(event, newValue) => setSelectedAllergens(newValue)}
      renderOption={(props, option, { selected }) => {
        const { key, ...rest } = props; // extract key from props
        return (
          <li key={key} {...rest}>
            <FormControlLabel
              control={<Checkbox checked={selected} />}
              label={option.label}
            />
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          // label="Select Allergens"
          placeholder="Select Allergens"
        />
      )}
    />
  );
};

export default AllergenSelector;
