import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { Publish as UpArrowIcon } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  scrollArrow: {
    display: 'flex',
    flexDirection: 'row',
    position: 'fixed',
    width: '25%',
    bottom: '20px',
    right: '10px',
    opacity: 0.8,
    zIndex: 1000,
    justifyContent: 'flex-end'
  }
}))

export default function ScrollArrow() {
  const classes = useStyles();
  const [isScrollVisible, setIsScrollVisible] = useState(false);

  const checkIfScrollVisible = () => {
    if (!isScrollVisible && window.pageYOffset > 2000) setIsScrollVisible(true);
    else if (isScrollVisible && window.pageYOffset <= 2000) setIsScrollVisible(false);
  }

  window.addEventListener('scroll', checkIfScrollVisible);

  return (
    <div className={classes.scrollArrow}>
      <IconButton
        size="large"
        style={{ display: isScrollVisible ? 'flex' : 'none' }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <UpArrowIcon fontSize="large" />
      </IconButton>
    </div>
  );
};
