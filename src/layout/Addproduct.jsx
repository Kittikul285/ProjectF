import axios from "axios";
import { useState } from "react";
export default function Addproduct() {
  


  const [addproduct, setProduct] = useState({
    name: "",
    image: "",
    category: "",
    price: "",
  });



  const hdlChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setProduct((prv) => ({ ...prv, [name]: files[0] }));
    } else {
      setProduct((prv) => ({ ...prv, [name]: value }));
    }
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", addproduct.name);
      formData.append("image", addproduct.image);
      formData.append("category", addproduct.category);
      formData.append("price", addproduct.price);
  
      const token = localStorage.getItem('token');
      const rs = await axios.post('http://localhost:8000/product/addproduct', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      console.log(rs);
  
      if (rs.status === 200) {
        alert("Addproduct Successful");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  
  

  

  const hdlReset = () => {
    setProduct({
      name: "",
      image: null,
      category: "",
      price: "",
    });
  };

  return (

    <div className="flex flex-col justify-center">
      <form className="flex flex-col gap-2" onSubmit={hdlSubmit} encType="multipart/form-data">
        <div className="p-5 text-center">
          <p>เพิ่มรูป</p>
        </div>
        <input
          type="file"
          className="file-input file-input-bordered file-input-primary w-full max-w-xs mx-auto"
          name="image"
          onChange={hdlChange}
        />
        <div className="p-5 text-center">
          <p>ชื่อสินค้า</p>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs mx-auto"
          name="name"
          value={addproduct.name}
          onChange={hdlChange}
        />
        <div className="p-5 text-center">
          <p>ราคาสินค้า</p>
        </div>
        <input
          type="number"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs mx-auto"
          name="price"
          value={addproduct.price}
          onChange={hdlChange}
        />
        <div className="p-5 text-center">
          <p>ประเภทสินค้า</p>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs mx-auto"
          name="category"
          value={addproduct.category}
          onChange={hdlChange}
        />
        <div className="flex justify-center gap-5">
          <button type="submit" className="btn-outline mt-7 btn btn-success">Success</button>
          <button type="reset" className="btn-outline mt-7 btn btn-error" onClick={hdlReset}>Reset</button>
        </div>
      </form>
    </div>
  

  );
  




























}
