import React from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

export default function TagSearchBar({
  tagList,
  tagFilter,
  setTagFilter,
  filteredData
}) {
  const tagToFrequency = {};
  for (let i = 0; i < filteredData.length; i++) {
    for (let j = 0; j < filteredData[i].tags.length; j++) {
      const tag = filteredData[i].tags[j];
      if (tagFilter.includes(tag)) continue;
      else if (tag in tagToFrequency) tagToFrequency[tag]++;
      else tagToFrequency[tag] = 1;
    }
  }
  const updatedTagList = Object.keys(tagToFrequency).map(tagName => ({
    name: tagName,
    frequency: tagToFrequency[tagName]
  }));
  updatedTagList.sort((tagA, tagB) => {
    if (tagA.frequency < tagB.frequency) return 1;
    else if (tagA.frequency > tagB.frequency) return -1;
    return 0;
  });
  return (
    <Autocomplete
      multiple
      fullWidth
      size="small"
      id="tag-searchbar"
      options={updatedTagList}
      getOptionLabel={tag => (`${tag.name} (${tag.frequency})`)}
      filterSelectedOptions
      onChange={(event, value) => setTagFilter(value.map(value => value.name))}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Tag Search"
          placeholder="Tags"
        />
      )}
    />
  );
};
