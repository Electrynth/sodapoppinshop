import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import sodaSmile from './assets/sodaSmile.png';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 32,
    marginBottom: 32
  },
  png: {
    width: 40,
    height: 40,
    borderRadius: 50
  }
}));

export default function Header() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img alt="sodaSmile" src={sodaSmile} className={classes.png} />
    </div>
  );
};