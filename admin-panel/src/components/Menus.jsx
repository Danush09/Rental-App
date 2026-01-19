import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { getUserData, logout, reset } from "../store/features/authSlice";
import { useDispatch } from "react-redux";

const Menus = () => {
  const navigate = useNavigate();
  const disptach = useDispatch();

  useEffect(() => {
    disptach(getUserData());
  }, [disptach]);

  const handleLogout = () => {
    disptach(logout());
    disptach(reset());
    toast.success("Logout Successflly!");
    localStorage.removeItem("appData");
    navigate("/login");
  };
  return (
    <>
      <div className="menu d-flex flex-column align-items-center justify-content-center mt-4">
        <p>Admin Panel</p>
        <Link to={"/"}>
          <i className="fa-solid fa-home"></i> Home
        </Link>
        <Link to={"/all-cars"}>
          <i className="fa-solid fa-car"></i> All Cars
        </Link>
        <Link to={"/add-car"}>
          <i className="fa-solid fa-plus"></i> Add Car
        </Link>
        <Link to={"/all-bookings"}>
          <i className="fa-solid fa-list"></i> Bookings
        </Link>
        <button className="btn btn-danger mt-4" onClick={handleLogout}>
          <i className="fa-solid fa-power-off"></i>
          LOGOUT
        </button>
      </div>
    </>
  );
};

export default Menus;
