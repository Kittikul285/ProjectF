import axios from "axios";
import { useEffect, useState } from "react";
import Productlist from "../layout/Productlist";



export default function ListProduct() {
  const [product,setshowpro] = useState([])
  useEffect(()=>{
    try {
      const run = async()=>{
        const token = localStorage.getItem('token');
        const rs =await axios.get(`http://localhost:8000/product/getproduct`,{
          headers : {Authorization : `Bearer ${token}`}
        })
        setshowpro(rs.data.getproduct)
      }
      run()
    } catch (err) {
      console.log( err.message)
    }
    
  },[])
  
  
  return (
    <>
    {/* {product && product.map((item) =>(<Productlist key={item.id} product={item} />))} */}
    {/* {JSON.stringify(getproduct)} */}
    
    <div className="grid grid-cols-4 grid-rows-4 gap-4 pt-12 ">
    
    { product.map(el =>(
        <Productlist key={el.id} el={el}/>
    ))
    }
    </div>

    
    </>
    
    
  );
}
