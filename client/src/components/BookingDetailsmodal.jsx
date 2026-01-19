import React from "react";

const BookingDetailsmodal = ({
  //   bookingDetailsModal,
  setBookingDetailsModal,
  bookings,
}) => {
  return (
    <>
      <div className="modal d-flex" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-dark text-light">
              <h5 className="modal-title">Your booking Details</h5>
              <button
                type="button"
                className="btn-close bg-light"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setBookingDetailsModal(false)}
              />
            </div>
            <div className="modal-body">
              <p>Journy Date : {bookings?.startDate} </p>
              <p>Return Date : </p>
              <p>Car Name : </p>
              <p>Total Price : </p>
              <p>Booking Status : </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingDetailsmodal;
