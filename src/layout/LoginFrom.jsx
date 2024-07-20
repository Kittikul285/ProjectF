import axios from "axios";
import {useState} from "react";
import useAuth from "../hooks/useAuth"

function LoginFrom() {
  const {setUser} = useAuth()
    const [input, setInput] = useState({
        email: "",
        password: "",
       
      });

      const hdlChange = (e) => {
        setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
      };

      const hdlSubmit = async e => {
        try {
          e.preventDefault()
          // validation
          const rs = await axios.post('http://localhost:8000/auth/login', input)
          console.log(rs.data.token)
          
        //   alert(rs.data.token)
          if (rs.status === 200) {
            alert('Login successful');
          }
          localStorage.setItem('token', rs.data.token)
          const rs1 = await axios.get('http://localhost:8000/auth/me', {
            headers : { Authorization : `Bearer ${rs.data.token}` }
          })
          console.log(rs1.data)
          setUser(rs1.data)
          
        }catch(err) {
          console.log( err.message)
        }
      }
    
  return (
    
    <div className="p-5 border w-4/6 min-w-[500px] mx-auto">
      <div className="text-3xl text-center">Login From</div>
      <form className="flex flex-col gap-2" onSubmit={hdlSubmit}>
        

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">E-mail</span>
          </div>
          <input
            type="email"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            name="email"
            value={input.email}
            onChange={ hdlChange }
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="password"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            name="password"
            value={input.password}
            onChange={ hdlChange }
          />
        </label>

        
        <div className="flex gap-5">
          <button type="submit" className="btn-outline mt-7 btn btn-success">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginFrom