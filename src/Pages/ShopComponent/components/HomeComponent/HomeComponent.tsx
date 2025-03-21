/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import ItemCard from '../../../ShareComponent/ItemCard/ItemCard';
import { ProductModel } from '../../../../Model/Product/ProductModel';
import { getProduct } from '../../../../Responsitories/ProductResponsitory';

const HomeComponent:React.FC = () =>{
  const [products,setproducts] = useState<ProductModel[]>()
  const [isMobile, setIsMobile] = useState<boolean>(false)
      useEffect(()=>{
        const fetch = async() =>{
          const data = await getProduct()
          setproducts(data)
        }
        fetch()
        handleResize()
        window.addEventListener('resize', handleResize)

        return () => {
          window.removeEventListener('resize', handleResize)
        }
      },[])
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768)
      }
      return (
        <div>
          <div className="row g-2">
            {Array.isArray(products) && products.map((product) => (
              <div className={isMobile ? 'col-12' : 'col-2'} key={product.id}>
                <ItemCard products={product} />
              </div>
            ))}
          </div>
          <Outlet />
        </div>
      )
}



export default HomeComponent
