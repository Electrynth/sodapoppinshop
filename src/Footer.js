import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LargeTooltip from './LargeTooltip';
import Emoji from './Emoji';
import gif from './assets/pika.gif';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 16
  },
  gif: {
    width: 40,
    height: 40,
    marginLeft: -12
  },
  title: {
    marginTop: 12,
    marginLeft: 8
  },
  authorRow: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="subtitle2">
        Last updated: 15 August 2021
      </Typography>
      <LargeTooltip
      title={(
        <Typography>
          DM for bugs, suggestions, stale data, or any other issues <Emoji symbol="👉" label="pointRight" /> GalacticFister in soda discord.
        </Typography>
      )}
    >
      <div className={classes.authorRow}>
        <img alt="pika" src={gif} className={classes.gif} />
        <Typography variant="subtitle" className={classes.title}>
          GalacticFister
        </Typography>
      </div>
    </LargeTooltip>
    </div>
  );
};
