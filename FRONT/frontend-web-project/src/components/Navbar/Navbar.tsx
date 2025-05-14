import { NavLink } from "react-router-dom";
import './Navbar.css';
import { UseModalContext } from "../../context/modal.context";

export const Navbar = () => {
    const { setState } = UseModalContext();
  
    const openModal = () => {
      setState(true);
    }
    
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><NavLink to="/home" className="active">Home</NavLink></li>
        <li><NavLink to="/profile/1">Profile</NavLink></li>
      </ul>
      <div className="logo">Hotel<br />Logo</div>
      <ul className="nav-links">
        <li><NavLink to="#">Services</NavLink></li>
        <li><NavLink to="#" onClick={openModal}>Login</NavLink></li>
      </ul>
    </nav>
  );
};
