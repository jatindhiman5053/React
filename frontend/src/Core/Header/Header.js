import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="Header">
      <ul>
        <li>
          <Link to="">Home</Link>
        </li>
        <li>
          <Link to="/AddUser">User List</Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
