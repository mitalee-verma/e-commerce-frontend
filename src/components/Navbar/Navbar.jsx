import React, { useContext, useState, useRef } from 'react'; 
import './Navbar.css';

import logo from '../Assests/logo.png';
import cart_icon from '../Assests/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from '../Assests/nav_dropdown.png';
// import { IoIosArrowDropdown } from "react-icons/io";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  // const [isRotated, setIsRotated] = useState(false); // added by abhoy
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();
  // const dropdownRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    // dropdownRef.current.classList.toggle('open');
    e.target.classList.toggle('open');
    // if(isRotated){ // added by abhoy 
    //   document.querySelector('.nav-dropdown').style.transform = 'rotate(0deg)';
    //   setIsRotated(false);
    // }
    // else{
    //   document.querySelector('.nav-dropdown').style.transform = 'rotate(90deg)';
    //   setIsRotated(true);
    // }
  };

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="Logo" />
        <p>SHOPPER</p>
      </div>
      <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="Dropdown Icon" />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => setMenu("shop")}><Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>{menu === "shop" ? <hr /> : null}</li>
        <li onClick={() => setMenu("mens")}><Link style={{ textDecoration: 'none' }} to='/mens'>Men</Link>{menu === "mens" ? <hr /> : null}</li>
        <li onClick={() => setMenu("women")}><Link style={{ textDecoration: 'none' }} to='/women'>Women</Link>{menu === "women" ? <hr /> : null}</li>
        <li onClick={() => setMenu("kids")}><Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link>{menu === "kids" ? <hr /> : null}</li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')
        ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
         :<Link to='/login'><button>Login</button></Link>}
        <Link to='/cart'><img src={cart_icon} alt="Cart Icon" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
