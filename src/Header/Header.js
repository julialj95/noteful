import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header>
      <Link to={"/"} className="header-link">
        Noteful
      </Link>
    </header>
  );
}
export default Header;
