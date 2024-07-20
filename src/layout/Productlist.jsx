import React from "react";
import axios from "axios";

export default function Productlist(props) {
  
  const { el } = props;
  // console.log( el.id)

  const hdldele = async (e) => {
    // console.log(el.id);
    try {
        // Confirm deletion
        const confirmation = window.confirm("คุณต้องการลบสินค้านี้หรือไม่?");
        if (!confirmation) {
            return; // If user cancels, exit the function
        }
        
        const token = localStorage.getItem("token");
        const rs = await axios.delete(
            `http://localhost:8000/product/del/${el.id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (rs.status === 200) {
            alert("ลบสำเร็จ");
            window.location.reload();
        }
    } catch (err) {
        console.log(err.message);
    }
};


  return (
  
   <>
    
     <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={el.image} alt="Shoes" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{el.name}</h2>
        <p>ประเภท {el.category}</p>
        <p>{el.price} บาท</p>
        <div className="card-actions">
          <button className="btn btn-error" onClick={hdldele}>
            ลบ
          </button>
        </div>
      </div>
    </div>
  
   </>
   
  );
}
