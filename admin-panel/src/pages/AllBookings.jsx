import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../store/features/bookingSlice";
import { Link } from "react-router-dom";

const AllBookings = () => {
  const [allBookings, setAllBookings] = useState([]);
  const [bookingStatus, setBookingStaus] = useState("all");
  const [filterBookings, setFilterBookings] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  const { bookings } = useSelector((state) => state.bookings);

  useEffect(() => {
    if (bookings) {
      setAllBookings(bookings);
    }
    const pending = allBookings.filter((item) => item?.status === "pending");
    const confirm = allBookings.filter((item) => item?.status === "confirm");
    const cancel = allBookings.filter((item) => item?.status === "cancel");

    if (bookingStatus === "pending") {
      setFilterBookings(pending);
    } else if (bookingStatus === "confirm") {
      setFilterBookings(confirm);
    } else if (bookingStatus === "cancel") {
      setFilterBookings(cancel);
    } else if (bookingStatus === "all") {
      setFilterBookings(bookings);
    }
  }, [bookings, allBookings, bookingStatus]);
  return (
    <Layout>
      <h1>All Bookings</h1>
      <div className="d-flex p-4">
        <label htmlFor="m-3">Filter By Status</label>
        <select
          className="form-select w-25 ms-3"
          onChange={(e) => setBookingStaus(e.target.value)}
        >
          <option value="all">All Bookings</option>
          <option value="pending">Pending</option>
          <option value="confirm">Confirm</option>
          <option value="cancel">Cancel</option>
        </select>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Start Date</th>
            <th>REturn Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>UPDATE</th>
          </tr>
        </thead>
        <tbody>
          {filterBookings &&
            filterBookings.map((b) => (
              <tr key={b?._id}>
                <td>{b?._id}</td>
                <td>{b?.startDate.substring(0, 10)}</td>
                <td>{b?.returnDate.substring(0, 10)}</td>
                <td>{b?.totalPrice}</td>
                <td>{b?.status}</td>
                <td>
                  <Link to={`/booking-details/${b?._id}`}>
                    <i className="fa-solid fa-pen"></i>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default AllBookings;
