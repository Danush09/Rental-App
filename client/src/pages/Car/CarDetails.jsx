
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import CarsData from "../../Data/carsData.json";
import toast from "react-hot-toast";
import BookingModal from "../../components/BookingModal";
import { useDispatch, useSelector } from "react-redux";
import { carBooking, getCarDetails } from "../../store/features/carSlice";

const CarDetails = () => {
  const { id } = useParams();
  const [carDetails, setCarDetails] = useState("");
  const [loading, setLoading] = useState(false);

  const { cars, success, error } = useSelector((state) => state.cars);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [pickupDate, setPickupDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [returnDate, setReturnDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  //total
  const calculateTotal = () => {
    if (pickupDate && returnDate) {
      const days = Math.max(
        1,
        Math.ceil(new Date(returnDate) - new Date(pickupDate)) /
        (1000 * 60 * 60 * 24)
      );
      return days * carDetails?.price;
    }
    return carDetails?.price;
  };

  //booking function
  const handleBooking = () => {
    const data = {
      user: user?._id,
      car: id,
      startDate: pickupDate,
      returnDate: returnDate,
      price: carDetails?.price,
      totalPrice: calculateTotal(),
    };
    dispatch(carBooking(data));
    if (success) {
      toast.success("Booking");
      setShow(false);
      navigate("/profile");
    }
    if (error) {
      setShow(false);
      toast.error(error);
    }
  };

  //find card data
  useEffect(() => {
    const getCardIfno = async () => {
      setLoading(true);
      try {
        dispatch(getCarDetails(id));
        if (cars) {
          const carInfo = cars?.find((car) => car?._id === id);
          setCarDetails(carInfo);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getCardIfno();
  }, [id, cars, dispatch]);
  console.log("cardetails", carDetails);
  return (
    <>
      {loading ? (
        <h2 className="text-center">Loading...</h2>
      ) : (
        <>
          <div className="row my-4" style={{ minHeight: "70vh" }}>
            <div className="col-md-8 d-flex alig-items-center justify-content-center">
              <img
                src={`data:image/png;base64,${carDetails?.image}`}
                alt="car-image"
              />
            </div>
            <div className="col-md-4">
              <h2>{carDetails?.name}</h2>
              <p>{carDetails?.about}</p>

              <div className="d-flex justify-content-between w-50 mb-1 bg-light p-2 px-3">
                <img src="https://cdn-icons-png.flaticon.com/512/6195/6195762.png" alt="year-con" height={30} width={30} />
                2025
              </div>
              <div className="d-flex justify-content-between w-50 mb-1 bg-light p-2 px-3">
                <img src="https://cdn-icons-png.flaticon.com/512/1048/1048315.png" alt="year-con" height={30} width={30} />
                {carDetails?.model?.toUpperCase()} (Model)
              </div>
              <div className="d-flex justify-content-between w-50 mb-1 bg-light p-2 px-3">
                <img src="https://www.shutterstock.com/image-vector/category-symbols-featuring-square-grids-600nw-2614452525.jpg" alt="year-con" height={30} width={30} />
                {carDetails?.category}
              </div>
              <div className="d-flex justify-content-between w-50 mb-1 bg-light p-2 px-3">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNcABYISV9R-JPjO6RcHlno41iW1DPKi74gmkf6yjq6tDETc-oseUtfAiUHLS4BeyqaDU&usqp=CAU" alt="year-con" height={30} width={30} />
                {carDetails?.fuel}
              </div>
              <div className="d-flex justify-content-between w-50 mb-1 bg-light p-2 px-3">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMG0nL_hiHB5fRkVRrW2KwlP9C9DcqGBU-1UXeSwhGAtNQGKWwBEhFtJWUVLPbcGJ4PvA&usqp=CAU" alt="year-con" height={30} width={30} />
                {carDetails?.seats}
              </div>
              <div className="d-flex justify-content-between w-50 mb-1 bg-light p-2 px-3">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoEFQp8hfs9U9i7Wr-DRxw8eV7-AR9haIgv9AhUrcKyKs2AwrtQQiAGYl4yOiMzg8o_j4&usqp=CAU" alt="year-con" height={30} width={30} />
                {carDetails?.milage}KM (per Liter)
              </div>
              <div className="d-flex justify-content-between w-50 mb-1 bg-light p-2 px-3">
                <img src="https://cdn-icons-png.flaticon.com/512/3410/3410249.png" alt="year-con" height={30} width={30} />
                {carDetails?.transmission ? 'Automatic' : 'Manual'}
              </div>
              <div className="d-flex justify-content-between w-50 mb-1 bg-light p-2 px-3">
                <img src="https://cdn-icons-png.flaticon.com/512/2769/2769441.png" alt="year-con" height={30} width={30} />
                {carDetails?.price}/- RS
              </div>


              <h6 className="m-3">Price : RS {carDetails?.price}/- per day</h6>
              {!user ? (
                <Link to={"/login"} className="btn btn-warning mb-3 mt-2">
                  please Login to Book this car
                </Link>
              ) : (
                <button
                  className="btn btn-dark w-50 mb-4"
                  onClick={() => setShow(!show)}
                >
                  Book Now
                </button>
              )}
            </div>
          </div>

          {/* modal */}
          {show && (
            <BookingModal
  setShow={setShow}
  price={carDetails?.price}
  pickupDate={pickupDate}
  setPickupDate={setPickupDate}
  returnDate={returnDate}
  setReturnDate={setReturnDate}
  car={cars}
  userId={user._id}
  handleBooking={handleBooking}
  calculateTotal={calculateTotal}
/>
          )}
        </>
      )}
    </>
  );
};

export default CarDetails;

