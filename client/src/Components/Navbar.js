import React from "react";

const Navbar = () => {
  return (
    <>
      <nav>
        <div class="nav-wrapper">
          <a href="#" class="brand-logo">
            FillMe
          </a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li>
              <a href="/register">Register</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="#">Link 3</a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
