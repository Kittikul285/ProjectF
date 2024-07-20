import axios from "axios";
import { useEffect, useState } from "react";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null); // Single user object
  const [cart, setCart] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:8000/cart/user', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data);
          setCart(prevCart => ({
            ...prevCart,
            userId: response.data.id
          }));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:8000/product/getproduct', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setProducts(response.data.getproduct);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getProducts();
  }, []);

  const addCart = async (productId, productPrice) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8000/cart/cart', {
        userId: user.id,
        productId: productId,
        total: 1,
        all_price: productPrice
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response.data);
      setCart(response.data);
    } catch (error) {
      console.error('เกิดข้อผิดพลาด', error);
    }
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 gap-4 pt-12">
      {products.map((product) => (
        <div key={product.id}>
          <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img src={product.image} alt={product.name} className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{product.name}</h2>
              <p>ประเภท {product.category}</p>
              <p>{product.price} บาท</p>
              <div className="card-actions">
                <button className="btn btn-primary" onClick={() => addCart(product.id, product.price)}>
                  เพิ่มใส่ตะกร้า
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
