import axios from "axios";
import {useState} from "react";

export default function RegisterFrom() {
  const [input, setInput] = useState({
    name: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    email: "",
    address: "",
    phone: "",
  });

  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!input.name || !input.lastName || !input.email || !input.password || !input.confirmPassword || !input.address || !input.phone)  {
        alert("Please fill in all fields");
      } else if (input.password !== input.confirmPassword) {
        alert("Please check confirm password");
      }
      console.log(input)
      const rs = await axios.post("http://localhost:8000/auth/register", input);
      console.log(rs);
      if (rs.status === 200) {
        alert("Register Successful");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="p-5 border w-4/6 min-w-[500px] mx-auto">
      <div className="text-3xl text-center">Register From</div>
      <form className="flex flex-col gap-2" onSubmit={hdlSubmit}>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            name="name"
            value={input.name}
            onChange={ hdlChange }
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Lastname</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            name="lastName"
            value={input.lastName}
            onChange={ hdlChange }
          />
        </label>

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

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Confirm Password</span>
          </div>
          <input
            type="password"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            name="confirmPassword"
            value={input.confirmPassword}
            onChange={ hdlChange }
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Address</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            name="address"
            value={input.address}
            onChange={ hdlChange }
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Phone</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            maxLength={10}
            name="phone"
            value={input.phone}
            onChange={ hdlChange }
          />
        </label>
        <div className="flex gap-5">
          <button type="submit" className="btn-outline mt-7 btn btn-success">
            Submit
          </button>
          <button type="reset" className="btn-outline mt-7 btn btn-error">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
