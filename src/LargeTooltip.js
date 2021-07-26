import React from 'react';
import { Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const LargeTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#5B5B5B',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(14),
    borderRadius: 5
  }
}))(Tooltip);

export default LargeTooltip;
