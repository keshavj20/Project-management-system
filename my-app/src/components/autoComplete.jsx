import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import useApi from "../Hooks/useApi";
import useDebounce from "../Hooks/useDebounce";

export default function AutoCompleteComponent({ name, label, value, onChange }) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  const debouncedInput = useDebounce(inputValue, 400);

  const { fetchData: fetchUsers } = useApi(
    `/api/user${debouncedInput.trim() ? `?search=${debouncedInput}` : ""}`,
    "get",
    false,
    {},
    (res) => {
      const formatted = (res || []).map((user) => ({
        label: user.name,
        value: user._id,
      }));
      setOptions(formatted);
    }
  );

 
  useEffect(() => {
    fetchUsers();
  }, [debouncedInput]);

  const selected = options.find((opt) => opt.value === value) || null;

  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.label}
      value={selected}
      onChange={(e, val) => onChange(val?.value || "")}
      inputValue={inputValue}
      onInputChange={(e, val) => setInputValue(val)}
      renderInput={(params) => (
        <TextField {...params} label={label} name={name} fullWidth />
      )}
    />
  );
}
