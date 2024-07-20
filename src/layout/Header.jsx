import {Link, useNavigate} from 'react-router-dom'

import useAuth from '../hooks/useAuth'


const guestNav = [
  { to : '/', text: 'Login'},
  { to : '/register', text: 'Register'},
]

const userNav = [
  { to : '/', text: 'Home'},
  {to : '/order', text: 'Order'},
  {to:'/cart', text: 'cart'},
]

const adminNav = [
  { to : '/', text: 'Home'},
  {to : '/show', text: 'ShowOrder'},
  {to: '/list', text: 'ListProduct'},
 
]


export default function Header() {
  const {user, logout} = useAuth()
  // const finalNav = user?.id ? userNav : guestNav
  const finalNav = user?.id ? (user.role ==="ADMIN" ? adminNav : userNav) : guestNav

 

  const navigate = useNavigate()

  // const hdlgotocart = ()=>{
  //   navigate('/cart')
  // }

  const hdlLogout = () =>{
    logout()
    navigate('/')
  }
  return (
    <div className="navbar bg-orange-400">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">Hello, {user?.id ? user.name : 'Guest'}</a>
  </div>
  <div className="flex-none">
    <ul className='menu menu-horizontal px-1'>
      { finalNav.map( el => (
        <li key={el.to}>
            <Link to={el.to}>{el.text}</Link>
        </li>
      ))}
    </ul>

    {/* <div className="dropdown dropdown-end"> */}

      
      {/* <Link to="#" onClick={hdlgotocart}> 
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>

                  <span className="badge badge-sm indicator-item">8</span>
                  
              </div>
            </div>
      </Link> */}


    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
     
        {user?.id && (
        <li>
          <Link to='#' onClick={hdlLogout}>Logout</Link>
        </li>
        )}
      </ul>
    </div>
  </div>
</div>
  )
}
