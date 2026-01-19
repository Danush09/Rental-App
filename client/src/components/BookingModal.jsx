import React from "react";
import { useNavigate } from 'react-router-dom';

const BookingModal = ({
  setShow,
  price,
  pickupDate,
  setPickupDate,
  returnDate,
  setReturnDate,
  car,
  userId,
}) => {
  const navigate = useNavigate();

  // Calculate total cost
  const calculateTotal = () => {
    if (pickupDate && returnDate) {
      const days = Math.max(
        1,
        Math.ceil(new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24)
      );
      return days * price;
    }
    return price;
  };

  return (
    <>
      <div className="modal d-flex" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-dark text-light">
              <h5 className="modal-title">Select Your Journey</h5>
              <button
                type="button"
                className="btn-close bg-light"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShow(false)}
              />
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="" className="form-label">Pickup Date</label>
                <input
                  type="date"
                  className="form-control"
                  defaultValue={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">Return Date</label>
                <input
                  type="date"
                  className="form-control"
                  defaultValue={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                />
              </div>
              <p>Price: {price}/- per day</p>
              <p>Note: please return before 10:00 AM else extra charges apply</p>
              <h4>Grand Total: {calculateTotal()}</h4>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShow(false)}
              >
                Close
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  // Save booking data and navigate
                  localStorage.setItem(
                    'pendingBooking',
                    JSON.stringify({ price, pickupDate, returnDate, car, userId })
                  );
                  navigate('/payment');
                }}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingModal;