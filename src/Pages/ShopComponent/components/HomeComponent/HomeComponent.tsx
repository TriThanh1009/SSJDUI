/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import ItemCard from '../../../ShareComponent/ItemCard/ItemCard';
import { ProductModel } from '../../../../Model/Product/ProductModel';
import { getProduct } from '../../../../Responsitories/ProductResponsitory';

const HomeComponent:React.FC = () =>{
  const [products,setproducts] = useState<ProductModel[]>()
      useEffect(()=>{
        const fetch = async() =>{
          const data = await getProduct()
          setproducts(data)
        }
        fetch()
      },[])
  return (
    <div>
      <div className="row g-2">
        { Array.isArray(products) && products.map((product)=>(
          <div className='col-3' key={product.id}>
            <ItemCard  products={product}/>
          </div>
        ))}
      </div>
      <Outlet/>

    </div>
    
  )
}



export default HomeComponent
