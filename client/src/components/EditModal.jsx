import React from "react";

const EditModal = ({
  setEditModal,
  uname,
  setUname,
  phone,
  setPhone,
  password,
  setPassword,
  handleUpdate,
}) => {
  return (
    <>
      <div className="modal d-flex" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-dark text-light">
              <h5 className="modal-title">MANAGE PROFILE</h5>
              <button
                type="button"
                className="btn-close bg-light"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setEditModal(false)}
              />
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={uname}
                  onChange={(e) => setUname(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Phone
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setEditModal(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                UPDATE
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditModal;
