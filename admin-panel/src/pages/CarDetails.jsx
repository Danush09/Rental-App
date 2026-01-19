import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deletCar,
  getAllCars,
  getCarDetails,
  updateCar,
} from "../store/features/carSlice";
import toast from "react-hot-toast";

const CarDetails = () => {
  const { id } = useParams();
  const { error, success, cars } = useSelector((state) => state.cars);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [carDetails, setCarDetails] = useState({});

  useEffect(() => {
    const getCarInfo = async () => {
      try {
        dispatch(getCarDetails(id));
        if (cars) {
          const carInfo = cars?.find((car) => car?._id === id);
          setCarDetails(carInfo && carInfo);
          // console.log("Cars Details page ==> ", carInfo);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCarInfo();
  }, [id, cars, dispatch]);

  const [name, setName] = useState("");
  const [model, setModel] = useState("top");
  const [year, setYear] = useState(2025);
  const [category, setCategory] = useState("hatcback");
  const [fuel, setFuel] = useState("petrol");
  const [seats, setSeats] = useState(4);
  const [milage, setMilage] = useState(8);
  const [price, setPrice] = useState(1000);
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("");
  const [transmission, setTransmission] = useState(false);

  useEffect(() => {
    setName(carDetails?.name);
    setModel(carDetails?.model);
    setAbout(carDetails?.about);
    setCategory(carDetails?.category);
    setFuel(carDetails?.fuel);
    setTransmission(carDetails?.transmission);
    setMilage(carDetails?.milage);
    setPrice(carDetails?.price);
    setImage(carDetails?.image);
    setSeats(carDetails?.seats);
    setYear(carDetails?.year);
  }, [carDetails]);

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("model", model);
    formData.append("year", year);
    formData.append("category", category);
    formData.append("fuel", fuel);
    formData.append("seats", seats);
    formData.append("milage", milage);
    formData.append("price", price);
    formData.append("about", about);
    formData.append("transmission", transmission);
    dispatch(updateCar({ id, formData }));
    if (success) {
      toast.success("car Update successfully");
      navigate("/all-cars");
    }
    if (error) {
      toast.error(error);
    }
  };

  //delete
  const handleDelete = () => {
    const confirm = window.confirm("Are You Sure Want To Delete This Car");
    if (confirm) {
      dispatch(deletCar(id));
      toast.success("Car Has Been Deleetd");
      navigate("/all-cars");
      dispatch(getAllCars());
    }
  };

  return (
    <Layout>
      <div
        className="d-flex flex-column align-items-center "
        style={{ minHeight: "80vh" }}
      >
        <h1 className="mt-4 bg-dark text-light w-75 text-center">
          {" "}
          Car Details
        </h1>
        <p>data is prefilled please change accordingly</p>
        <div className="" style={{ width: "700px" }}>
          <div className="mb-3">
            <label className="form-label">CAr Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Model</label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Year</label>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Seats </label>
            <input
              type="text"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Milage</label>
            <input
              type="text"
              value={milage}
              onChange={(e) => setMilage(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-b">
            <label htmlFor="" className="form-lable">
              Transmission
            </label>
            <select
              className="form-select mb-3"
              value={transmission}
              onChange={(e) => setTransmission(e.target.value)}
            >
              <option value={false}>Manual</option>
              <option value={true}>Automatic</option>
            </select>
          </div>
          <div className="mb-b">
            <label htmlFor="" className="form-lable">
              Fuel
            </label>
            <select
              className="form-select mb-3"
              value={fuel}
              onChange={(e) => setFuel(e.target.value)}
            >
              <option value={"petrol"}>Petrol</option>
              <option value={"diesel"}>diesel</option>
              <option value={"electric"}>Electric</option>
            </select>
          </div>
          <div className="mb-b">
            <label htmlFor="" className="form-lable">
              category
            </label>
            <select
              className="form-select mb-3"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value={"hatchback"}>Hatchback</option>
              <option value={"sedan"}>Sedan</option>
              <option value={"luxary"}>Luxary</option>
            </select>
          </div>
          <div className="mb-b">
            <label htmlFor="" className="form-lable">
              About
            </label>
            <input
              type="text"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="" className="form-label">
              Image : (max size 1mb)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="form-control"
            />
          </div>
          <div className="m-3">
            <button className="btn btn-primary m-3" onClick={handleUpdate}>
              UPDATE CAR
            </button>
            <button className="btn btn-danger m-3" onClick={handleDelete}>
              DELETE CAR
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CarDetails;
