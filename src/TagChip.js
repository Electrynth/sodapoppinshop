import React from 'react';
import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LargeTooltip from './LargeTooltip';
import tagDefinitions from './assets/tagDefinitions.js';

const useStyles = makeStyles((theme) => ({
  tagChip: {
    marginRight: 4,
    marginBottom: 4,
    cursor: 'pointer'
  }
}));

export default function TagChip({ tag, title = 'cum' }) {
  const classes = useStyles();
  if (tag in tagDefinitions) {
    title = tagDefinitions[tag];
  }
  return (
    <LargeTooltip arrow title={title}>
      <Chip
        size="small"
        variant="outlined"
        label={tag}
        className={classes.tagChip}
      />
    </LargeTooltip>
  );
};
