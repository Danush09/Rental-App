import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadToken } from "../store/features/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadToken());
  }, [dispatch]);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <img src="https://img.freepik.com/free-vector/colorful-bird-illustration-gradient_343694-1741.jpg"
              alt="logo" height={40} width={50} />
            <h6 className="navbar-brand" >
              CAR RENTAL APP
            </h6>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {!token ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link "
                      aria-current="page"
                      to="/register"
                    >
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to="/cars">
                      All Cars
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link " aria-current="page" to="/about">
                      About
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link "
                      aria-current="page"
                      to="/contact"
                    >
                      Contact
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link "
                      aria-current="page"
                      to="/profile"
                    >
                      MY ACCOUNT
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;


