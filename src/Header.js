import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import sodaSmile from './assets/sodaSmile.png';
import { Info } from '@material-ui/icons';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  logo: {
    display: 'flex',
    justifyContent: 'center'
  },
  png: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginTop: 6,
    marginBottom: 6
  },
  banner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

export default function Header() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.logo}>
        <img alt="sodaSmile" src={sodaSmile} className={classes.png} />
      </div>
      <div className={classes.banner}>
        <Info />
        <div style={{ marginRight: 4 }} />
        <Typography variant="subtitle2">
          Some item links may be temporarily unavailable due to Teespring automatic copyright flagging.
        </Typography>
      </div>
    </div>
  );
};
