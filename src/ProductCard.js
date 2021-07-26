import React from 'react';
import {
  Fade,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TagChip from './TagChip';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 4,
    padding: 8
  },
  productImage: {
    borderRadius: 5,
    height: 280,
    width: 280,
    cursor: 'pointer'
  },
  text: {
    maxWidth: 280,
    display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  tagRow: {
    maxWidth: 280,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  tagChip: {
    marginRight: 4
  }
}));

export default function ProductCard({ product }) {
  const classes = useStyles();
  const { name, tags, variants } = product;
  const { frontImage, backImage, price, productName, url } = variants[0];
  return (
    <div className={classes.root}>
      <Fade in={true} timeout={{ enter: 750, exit: 0 }}>
        <img
          alt={name}
          src={frontImage}
          onMouseOver={backImage ? e => (e.currentTarget.src = backImage) : undefined}
          onMouseOut={backImage ? e => (e.currentTarget.src = frontImage) : undefined}
          className={classes.productImage}
          onClick={() => {
            const newWindow = window.open(url, '_blank', 'noopener noreferrer');
            if (newWindow) newWindow.opener = null;
          }}
        />
      </Fade>
      <div className={classes.text}>
        <Typography variant="h6">
          {name.length > 20 && !name.includes(' ') ? `${name.slice(0, 20)}...` : name }
        </Typography>
        <Typography variant="body2">{productName}</Typography>
        <Typography variant="h6">{price}</Typography>
        <div className={classes.tagRow}>
          {tags.map(tag => <TagChip key={tag} tag={tag} />)}
        </div>
      </div>
    </div>
  );
};
