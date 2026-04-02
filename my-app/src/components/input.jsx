import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

export default function FreeSolo({ inputtext, options = [], onChangeText }) {
  return (
    <Stack spacing={1} sx={{ width: "100%" }}>
      <Autocomplete
        freeSolo
        options={options}
        onInputChange={(event, value) => {
          onChangeText(value); 
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={inputtext}
            type="search"
          />
        )}
      />
    </Stack>
  );
}
