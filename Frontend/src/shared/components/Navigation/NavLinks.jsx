import { useContext } from "react";
import "./NavLinks.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

export default function NavLinks() {
  const auth=useContext(AuthContext);
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" end>
          ALL USERS
        </NavLink>
      </li>
     {auth.isLoggedIn &&  <li>
        <NavLink to="/u1/places">
            MY PLACES
        </NavLink>
      </li>}
    {auth.isLoggedIn &&   <li>
        <NavLink to="/places/new">
         ADD PLACE
        </NavLink>
      </li> }
    {!auth.isLoggedIn &&  <li>
        <NavLink to="/auth">
          AUTHENTICATE
        </NavLink>
      </li> }
      {auth.isLoggedIn && <li>
        <button onClick={auth.logout}>LOGOUT</button>
        </li>}
    </ul>
  );
}