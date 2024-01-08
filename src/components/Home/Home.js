import React, { useState, useEffect } from 'react';
import ProductItem from '../ProductItem/ProductItem';
import Search from '../Search/Search';
import styles from './Home.module.css'

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = () => {
    setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
  };

  const sortedProducts = products
    .filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const aValue = a.price;
      const bValue = b.price;

      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    });

  return (
    <div>
      <Search onSearch={handleSearch} />
      <div className="container my-3">
        <div className="d-flex ">
          <div className="dropdown">
            <button className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              id="sortDropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Sort By: Price
            </button>
            <div className="dropdown-menu" aria-labelledby="sortDropdown">

              <button
                className="dropdown-item"
                onClick={handleSortChange}
              >
                Price: High to Low
              </button>
              <button
                className="dropdown-item"
                onClick={handleSortChange}
              >
                Price: Low to High
              </button>
            </div>
          </div>
          {searchTerm && (
            <h4 className={["text-center d-flex", styles['show']].join(" ")}>
              Showing {sortedProducts.length} result for {searchTerm}
            </h4>
          )}
        </div>
        <div className="row my-3">
          {sortedProducts.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <ProductItem
                id={product.id}
                title={product.title}
                description={product.description ? product.description.slice(0, 88) : ""}
                images={product.images}
                price={product.price}
                rating={product.rating}
                stock={product.stock}
                brand={product.brand}
                thumbnail={product.thumbnail}
                category={product.category}
                discountPercentage={product.discountPercentage}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
