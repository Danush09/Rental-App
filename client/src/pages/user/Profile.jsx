import React, { useEffect, useState } from "react";
import EditModal from "../../components/EditModal";
import BookingDetailsmodal from "../../components/BookingDetailsmodal";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserBookings,
  getUserData,
  logout,
  reset,
  updateUser,
} from "../../store/features/authSlice";
import toast from "react-hot-toast";

const Profile = () => {
  const [editModal, setEditModal] = useState(false);
  const [bookingDetailsModal, setBookingDetailsModal] = useState(false);
  const { user, success, error, bookings } = useSelector((state) => state.auth);
  const navigation = useNavigate();
  const disptach = useDispatch();

  useEffect(() => {
    disptach(getUserData());
  }, [disptach]);

  const handleBookings = (id) => {
    disptach(getUserBookings({ id }));
  };

  const [uname, setUname] = useState(user && user.uname);
  const [phone, setPhone] = useState(user && user.phone);
  const [password, setPassword] = useState(user && user.password);

  //update
  const handleUpdate = () => {
    const updatedUser = { uname, phone, password };
    const id = user?._id;
    disptach(updateUser({ id, updatedUser }));
    disptach(reset());
    if (success) {
      toast.success("Profile Updated!");
      setEditModal(false);
      disptach(getUserData());
    }
    if (error) {
      toast.error(error);
    }
  };

  const handleLogout = () => {
    disptach(logout());
    disptach(reset());
    toast.success("Logout Successflly!");
    localStorage.removeItem("appData");
    navigation("/login");
  };
  return (
    <>
      <div className="container" style={{ minHeight: "70vh" }}>
        <div className="row bg-light p-5">
          <div className="col-md-3">
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="userimage" height={'200px'} width={'200px'} />
          </div>
          <div className="col-md-6">
            <p>Name : {user?.uname} </p>
            <p>Email :{user?.email} </p>
            <p>Phone : {user?.phone} </p>
            <button
              className="btn btn-warning"
              onClick={() => setEditModal(!editModal)}
            >
              Edit Details
            </button>
            <button className="btn btn-danger ms-3" onClick={handleLogout}>
              LOGOUT
            </button>
            <button
              className="btn btn-success m-3"
              onClick={() => handleBookings(user?._id)}
            >
              GET Bookings
            </button>
          </div>
        </div>

        <div className=" mt-3 mb-5">
          <h4>Your Boookings</h4>

          <table className="table mt-3 text-center">
            <tbody>
              <tr className="bg-dark text-light">
                <th>booking id</th>
                <th>Booking Date</th>
                <th>Journy Date</th>
                <th>Return Date</th>
                <th>Price</th>
                <th>Total Price</th>
                <th>Status</th>
              </tr>

              {bookings?.map((b) => (
                <tr>
                  <td>{b?._id}</td>
                  <td>{b?.createdAt.substring(0, 10)}</td>
                  <td>{b?.startDate.substring(0, 10)}</td>
                  <td>{b?.returnDate.substring(0, 10)}</td>
                  <td>{b?.price}</td>
                  <td>{b?.totalPrice}</td>
                  <td>{b?.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* //edit modal */}
      {editModal && (
        <EditModal
          editModal={editModal}
          setEditModal={setEditModal}
          uname={uname}
          setUname={setUname}
          phone={phone}
          setPhone={setPhone}
          password={password}
          setPassword={setPassword}
          handleUpdate={handleUpdate}
        />
      )}
      {/* //booking details modal */}
      {bookingDetailsModal && (
        <BookingDetailsmodal
          bookingDetailsModal={bookingDetailsModal}
          setBookingDetailsModal={setBookingDetailsModal}
        />
      )}
    </>
  );
};

export default Profile;
