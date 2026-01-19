import React from "react";
import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  return (
    <>
      <Link to={`/cars/${car?._id}`} style={{ textDecoration: "none" }}>
        <div className="card m-2" style={{ width: "18rem" }}>
          <img
            src={`data:image/png;base64,${car?.image}`}
            alt="car-image"
            className="card-img-top"
          />
          <div className="card-body">
            <h5 className="card-title">{car?.name}</h5>
            <p className="card-price">Rs {car?.price}/-</p>
            {/* <p className="card-text">{car?.about.substring(0, 50)}...</p> */}
          </div>
        </div>
      </Link>
    </>
  );
};

export default CarCard;

