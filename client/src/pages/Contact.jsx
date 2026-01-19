import React from "react";

const Contact = () => {
  return (
    <>
      <div
        className=""
        style={{ minHeight: "80vh" }}
      >
        <div className="row">
          <div className="col-md-6">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5cHTxTf3NauiTdxfOVZPQk1sy8shjsJ-97Q&s"
              alt="conatct"
              height={'110%'}
              width={'100%'}
            />
          </div>
          <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
            <h2>For Any Assistance</h2>
            <h2 className="mt-3 text-success">
              <i className="fa-solid fa-phone-volume"> </i> 0123456789
            </h2>
            <h2 className="mt-3">
              <i className="fa-solid fa-envelope"> </i> Help@carrentalapp.com
            </h2>
          </div>
        </div>


      </div>
    </>
  );
};

export default Contact;
