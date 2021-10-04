import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline'
import { withWidth, Fade, TablePagination } from '@material-ui/core';
import ThemeWrapper from './ThemeWrapper';
import ProductCard from './ProductCard';
import Header from './Header';
import Footer from './Footer';
import TagSearchBar from './TagSearchBar';
import NameSearchBar from './NameSearchBar';
import ScrollArrow from './ScrollArrow';
import logo from './assets/icon.png';
import finalProducts from './assets/finalProducts';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
      margin: 12
    }
  },
  loaderImage: {
    top: '50%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)'
  },
  searchBars: {
    display: 'flex'
  },
  searchBarsMobile: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const applyNameAndTagFilters = (nameFilter, tagFilter, products) => {
  const filteredProducts = [];

  if (!nameFilter && tagFilter.length === 0) {
    return products;
  }

  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    if (nameFilter && product.name.includes(nameFilter)) {
      filteredProducts.push(product);
      continue;
    }

    let matches = 0;
    for (let j = 0; j < tagFilter.length; j++) {
      if (product.tags.includes(tagFilter[j])) matches++;
    }
    if (matches === tagFilter.length && tagFilter.length > 0) {
      filteredProducts.push(product);
    }
  }
  return filteredProducts;
};

function App({ width }) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [nameFilter, setNameFilter] = useState('');
  const [tagFilter, setTagFilter] = useState([]);

  const productData = finalProducts.products;
  const tagList = finalProducts.tagList;

  // useEffect(() => {
  //   axios.get('http://localhost:3001/productData').then(response => {
  //     setProductData(response.data.products);
  //     setTagList(response.data.tagList);
  //     setIsLoading(false);
  //   });
  // }, []);

  const handleChangePage = (event, newPage) => setPageNumber(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageNumber(0);
  };

  let productCards = [];

  const filteredData = applyNameAndTagFilters(nameFilter, tagFilter, productData);

  filteredData.forEach((product, i) => {
    let j = i + 1;
    if (j > pageNumber * rowsPerPage && j <= (pageNumber + 1) * rowsPerPage) {
      productCards.push(
        <ProductCard
          key={product.name}
          product={product}
        />
      );
    }
  });

  const isMobile = width === 'xs' || width === 'sm';

  return (
    <ThemeWrapper themeColor="dark">
      <CssBaseline />
      <ScrollArrow />
      <Fade in={isLoading} timeout={{ enter: 0, exit: 500 }}>
        <img alt="loading logo" src={logo} className={classes.loaderImage} />
      </Fade>
      <Fade in={!isLoading} timeout={{ enter: 500, exit: 0 }}>
        <div className={classes.root}>
          <Header />
          <div className={isMobile ? classes.searchBarsMobile : classes.searchBars}>
            <div style={{ flexBasis: '40%', marginRight: 8, marginBottom: 8 }}>
              <NameSearchBar
                products={productData}
                nameFilter={nameFilter}
                setNameFilter={setNameFilter}
              />
            </div>
            <div style={{ flexBasis: '60%' }}>
              <TagSearchBar
                filteredData={filteredData}
                tagList={tagList}
                tagFilter={tagFilter}
                setTagFilter={setTagFilter}
              />
            </div>
          </div>
          <TablePagination
            component="div"
            count={filteredData.length}
            rowsPerPageOptions={[25, 50, 100, 250, { label: 'All', value: filteredData.length }]}
            page={pageNumber}
            onChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {productCards}
          </div>
          <TablePagination
            component="div"
            count={filteredData.length}
            rowsPerPageOptions={[25, 50, 100, 250, { label: 'All', value: -1 }]}
            page={pageNumber}
            onChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
          <Footer />
        </div>
      </Fade>
    </ThemeWrapper>
  );
}

export default withWidth()(App);
