import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Grid,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import AutoCompleteComponent from "./autoComplete";

export default function Form({
  open,
  handleClose,
  fields = [],
  computations=[],
  heading = "",
  onsubmit,
}) {
  const [formdata, setformdata] = useState({});

 function getInitialFormData(fields, computations) {
  const initial = {};

  fields.forEach(({ name, value, defaultSelected }) => {
    initial[name] = typeof value === "function" ? value() : value ?? "";

    if (defaultSelected) {
      initial[name] = defaultSelected;
    }
  });

  // Run all computations once with their defaultSelected values
  computations.forEach(({ name, compute }) => {
    const selected = initial[name];
    const computedValues = compute({ selected, formData: initial });
    if (computedValues) {
      Object.assign(initial, computedValues); // Merge results
    }
  });

  return initial;
}


useEffect(() => {
  if (!open) return;
  const initialData = getInitialFormData(fields, computations);
  setformdata(initialData);
}, [open, fields]);


  const handleChange = (e) => {
    setformdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const renderField = (field) => {
    const { name, label, type = "text", options, defaultSelected } = field;

    if (defaultSelected && Array.isArray(options)) {
      return (
        <FormControl component="fieldset" sx={{ mb: 2 }} key={name}>
          <RadioGroup
            row
            name={name}
            value={formdata[name] || ""}
        onChange={(e) => {
  const selected = e.target.value;

  const computation = computations.find((comp) => comp.name === field.name);

  if (computation && typeof computation.compute === "function") {
    const computed = computation.compute({ selected, formData:formdata });
    if (computed) {
      setformdata((prev) => ({
        ...prev,
        ...computed,
        [field.name]: selected, // Set the changed value too
      }));
      return;
    }
  }

  // If no computation, just update the selected value
  setformdata((prev) => ({
    ...prev,
    [field.name]: selected,
  }));
}}

          >
            {options.map((opt) => (
              <FormControlLabel
                key={opt.label}
                value={opt.label}
                control={<Radio />}
                label={opt.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      );
    }

    if (type === "autocomplete") {
      return (
        <AutoCompleteComponent
          key={name}
          name={name}
          label={label}
          value={formdata[name] || ""}
          onChange={(val) =>
            setformdata((prev) => ({
              ...prev,
              [name]: val,
            }))
          }
        />
      );
    }

    if (type === "select") {
      return (
        <TextField
          key={name}
          select
          fullWidth
          label={label}
          name={name}
          value={formdata[name] || ""}
          onChange={handleChange}
        >
          {options.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>
      );
    }

    return (
      <TextField
        key={name}
        fullWidth
        type={type}
        label={label}
        name={name}
        value={formdata[name] || ""}
        onChange={handleChange}
        InputLabelProps={type === "date" ? { shrink: true } : {}}
      />
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onsubmit(formdata);
      handleClose();
    } catch (error) {
      console.error("Form submission failed:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ bgcolor: "#f5f5f5", py: 2, px: 3 }}>
          <Typography variant="h6">{heading}</Typography>
        </DialogTitle>

        <DialogContent dividers>
          {fields
            .filter((field) => field.defaultSelected && Array.isArray(field.options))
            .map(renderField)}

          <Stack spacing={3} mt={1}>
            {fields
              .filter(
                (field) =>
                  !["start_date", "end_date", "action_buttons"].includes(field.name) &&
                  !field.defaultSelected
              )
              .map(renderField)}

            <Grid container spacing={2}>
              {fields
                .filter(
                  (field) =>
                    field.name === "start_date" || field.name === "end_date"
                )
                .map((field) => (
                  <Grid item xs={6} key={field.name}>
                    {renderField(field)}
                  </Grid>
                ))}
            </Grid>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
