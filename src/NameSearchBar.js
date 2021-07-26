import React from 'react';
import {
  TextField
} from '@material-ui/core';
import {
  Autocomplete
} from '@material-ui/lab';

export default function NameSearchBar({ products, nameFilter, setNameFilter }) {
  return (
    <Autocomplete
      fullWidth
      size="small"
      id="name-searchbar"
      options={products.map(product => ({ name: product.name }))}
      getOptionLabel={product => product.name}
      onChange={(e, value) => setNameFilter(value ? value.name : '')}
      renderInput={(params) => <TextField {...params} label="Name Search" variant="outlined" />}
    />
  );
};
