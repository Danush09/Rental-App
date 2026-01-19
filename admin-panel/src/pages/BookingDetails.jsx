import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getBookingDetails,
  updateStatus,
} from "../store/features/bookingSlice";
import toast from "react-hot-toast";

const BookingDetails = () => {
  const { id } = useParams();
  const [bookingStatus, setBookingStatus] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBookingDetails(id));
  }, [dispatch, id]);

  const { booking } = useSelector((state) => state.bookings);

  const handleBookingUpdate = (id) => {
    dispatch(updateStatus({ id, status: bookingStatus }));
    toast.success("Booking Status Updated");
    navigate("/all-bookings");
  };
  return (
    <Layout>
      <div className="d-flex flex-column align-items-center ">
        <h1>Bookin Details</h1>
        <p>Booking ID : {booking?.id}</p>
        <p>Customer Name : {booking?.customerName}</p>
        <p>Phone : {booking?.phone}</p>
        <p>Start Date : {booking?.startDate?.substring(0, 10)}</p>
        <p>Return Date : {booking?.returnDate?.substring(0, 10)}</p>
        <p>PRice : {booking?.price}</p>
        <p>Total PRice : {booking?.totalPrice}</p>
        <p>Status : {booking?.status}</p>
        <p>Booking TIME : {booking?.bookingTime}</p>

        <div className="mb-b">
          <label htmlFor="" className="form-lable">
            Transmission
          </label>
          <select
            className="form-select mb-3"
            value={bookingStatus}
            onChange={(e) => setBookingStatus(e.target.value)}
          >
            <option value={"pending"}>Pending</option>
            <option value={"confirm"}>Confirm</option>
            <option value={"cancel"}>Cancel</option>
          </select>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => handleBookingUpdate(booking?.id)}
        >
          UPDATE STATUS
        </button>
      </div>
    </Layout>
  );
};

export default BookingDetails;