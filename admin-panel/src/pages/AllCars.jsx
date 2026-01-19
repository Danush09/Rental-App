import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getAllCars } from "../store/features/carSlice";
import { Link } from "react-router-dom";

const AllCars = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  const { cars } = useSelector((state) => state.cars);

  return (
    <Layout>
      <div className=" mt-3">
        <h1>All Cars</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">CAR</th>
              <th scope="col">CAR NAME</th>
              <th scope="col">Model</th>
              <th scope="col">Year</th>
              <th scope="col">Category</th>
              <th scope="col">Seats</th>
              <th scope="col">Fuel</th>
              <th scope="col">Milage</th>
              <th scope="col">Transmission</th>
              <th scope="col">Price</th>
              <th scope="col">Status</th>
              <th scope="col">EDIT</th>
            </tr>
          </thead>
          <tbody>
            {cars?.map((c) => (
              <tr key={c?._id}>
                <td>
                  <img
                    src={`data:image/png;base64,${c?.image}`}
                    alt="car-image"
                    height={100}
                    width={100}
                  />
                </td>
                <td>{c?.name}</td>
                <td>{c?.model}</td>
                <td>{c?.year}</td>
                <td>{c?.category}</td>
                <td>{c?.seats}</td>
                <td>{c?.fuel}</td>
                <td>{c?.milage}</td>
                <td>{c?.transmission ? "Automatice" : "Maual"}</td>
                <td>{c?.price}</td>
                <td>{c?.status ? "Avilabe" : "Not Availabe"}</td>
                <td>
                  <Link to={`/car-details/${c?._id}`}>
                    <i className="fa-solid fa-pen"></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default AllCars;
