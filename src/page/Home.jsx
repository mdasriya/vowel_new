import React, { useEffect, useState } from 'react'
import ProductCard from '../component/homepageCom/ProductCard'
import Cart from './Cart'
import { apiConnector } from '../services/apiconnector';
import { productEndpoints } from '../services/apis';

// const products = [
//     {
//       _id: 1,
//       name: 'T-Shirt',
//       href: '#',
//       imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
//       imageAlt: "Front of men's Basic Tee in black.",
//       price: 35,
//       color: 'Black',
//     },
//     {
//       _id: 2,
//       name: 'Basic Tee',
//       href: '#',
//       imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg',
//       imageAlt: "Front of men's Basic Tee in black.",
//       price: 35,
//       color: 'White',
//     },
//     {
//       _id: 3,
//       name: 'Basic Tee',
//       href: '#',
//       imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg',
//       imageAlt: "Front of men's Basic Tee in black.",
//       price: 35,
//       color: 'Black',
//     },
//     {
//       _id: 4,
//       name: 'Basic Tee',
//       href: '#',
//       imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg',
//       imageAlt: "Front of men's Basic Tee in black.",
//       price: 35,
//       color: 'Black',
//     }
//     // More products...
//   ];

const Home = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async()=>{
    try{
      const res = await apiConnector("GET", productEndpoints.GET_ALL_PRODUCTS_API);
      console.log("Products : ", res.data.data);
      setProducts(res.data?.data);
    }
    catch (error) {
      console.log("Could not get Products",error.message);
    }
  }
  useEffect(() => {
    getProducts()
  }, []);
    console.log("Product outside fucntion", products);
  return (
    <div className='bg-gray-100 mb-5'>
      <ProductCard products={products}/>
      <Cart/>
      {/* <h1>this is home page</h1> */}
    </div>
  )
}

export default Home
