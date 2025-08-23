import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import TextField from "@mui/material/TextField";
import { RiDeleteBin6Line } from "react-icons/ri";

const FieldRow = ({
  catIndex,
  fieldIndex,
  field,
  handleFieldChange,
  removeField,
}) => {
  return (
    <div className="row mb-2">
      <div className="col-md-6 mb-sm-0 ">
        <TextField
          label="Item Name"
          variant="outlined"
          size="small"
          type="text"
          className="w-100 mb-3"
          value={field.itemName}
          onChange={(e) =>
            handleFieldChange(catIndex, fieldIndex, "itemName", e.target.value)
          }
        />
      </div>
      <div className="col-md-4 col-9">
        <TextField
          label="Extra Charges (£)"
          variant="outlined"
          size="small"
          type="text"
          value={field.extra_charge}
          className="w-100 mb-3"
          onChange={(e) =>
            handleFieldChange(catIndex, fieldIndex, "extra_charge", e.target.value)
          }
        />
    </div>
    <div className="col-md-2 col-3 mb-3">
        <button
          type="button"
          className="btn delete_btn"
          onClick={() => removeField(catIndex, fieldIndex)}
        >
          <RiDeleteBin6Line size={22} className="delete_icon" />
        </button>
    </div>

    </div>
  );
};

export default FieldRow;
