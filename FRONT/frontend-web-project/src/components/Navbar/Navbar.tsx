import { NavLink, useNavigate } from "react-router-dom";
import './Navbar.css';
import { UseModalContext } from "../../context/modal.context";
import { getUserRoleFromToken } from "../../router/guards/PrivateGuard";

export const Navbar = () => {
  const token = localStorage.getItem('token');

  let role: string | null = null;
  if (token) {
    role = getUserRoleFromToken(token)
  }
  console.log("soy el rol", role)

  const deleteToken = () => {
    localStorage.clear();
  }

  const { setState } = UseModalContext();
  const openModal = () => {
    setState(true);
  }

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><NavLink to="/home" className="active">Home</NavLink></li>
        <li><NavLink to="/private/profile">Profile</NavLink></li>
      </ul>
      <div className="logo">Hotel<br />Logo</div>
      <ul className="nav-links">
        {role == "RECEPTIONIST" || role == "ADMIN" ?
          <li><NavLink to="/private/reception">Checks</NavLink></li> :
          <li style={{color:'#fff'}}>-----</li>
        }
        {!token ?
          <li><NavLink to="#" onClick={openModal}>Login</NavLink></li>
          :
          <li><a href="/home" onClick={deleteToken}>Logout</a></li>
        }
      </ul>
    </nav>
  );
};
