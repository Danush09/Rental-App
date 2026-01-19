
import React, { useEffect } from "react";
import CarsData from "../../Data/carsData.json";
import CarCard from "../../components/CarCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllCars } from "../../store/features/carSlice";

const Cars = () => {
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.cars);

  useEffect(() => {
    const getCars = () => {
      try {
        dispatch(getAllCars());
      } catch (error) {
        console.log(error);
      }
    };
    getCars();
  }, [dispatch]);
  return (
    <>
      <div className="allCars" style={{ minHeight: "80vh" }}>
        <h3 className="text-center mb-1">Explore our car collection</h3>
        <p className="text-center">click on the car to see spec & price</p>
        <div className="d-flex flex-wrap justify-content-center">
          {cars?.map((car) => (
            <CarCard car={car} key={car?._id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Cars;

