import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { CardGroup } from 'react-bootstrap';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3001/products')
    .then(response => response.json())
    .then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);
  return (
    <div>
      { loading ? 'carregando...' : (
         <CardGroup>
           {products.map(({ name, value, _id, img }) => <ProductCard key={_id} id={_id} name={name} value={value} img={img} />)}
         </CardGroup>
      ) }
    </div>
  );
}

export default Home;
