import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LargeTooltip from './LargeTooltip';
import Emoji from './Emoji';
import gif from './assets/pika.gif';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 32,
    marginBottom: 16
  },
  gif: {
    width: 40,
    height: 40
  },
  title: {
    marginTop: 12,
    marginLeft: 8
  }
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <LargeTooltip
      title={(
        <Typography>
          DM for bugs or suggestions <Emoji symbol="👉" label="pointRight" /> GalacticFister in soda discord.
        </Typography>
      )}
    >
      <div className={classes.root}>
        <img alt="pika" src={gif} className={classes.gif} />
        <Typography variant="caption" className={classes.title}>
          GalacticFister
        </Typography>
      </div>
    </LargeTooltip>
  );
};
