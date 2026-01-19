import React from "react";
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <>

      <div className="row hero-content " style={{ minHeight: '80vh' }}>
        <div className="col-md-8">
          <Link to="/cars">
            <img
              src="https://www.tatamotors.com/wp-content/themes/TataMotors/images/Passenger-Vehicle-desktop.jpg" alt="banner" height={'100%'} width={'100%'} />
          </Link>
        </div>
        <div className="col-md-4  ">
          <div className="d-flex flex-column align-items-center justify-content-center h-100">
            <h1>Don't rent a car </h1>
            <h1>Own THE car.</h1>
            <Link to={'/cars'} className="btn">Explore Our Collection</Link>
          </div>
        </div>
      </div>

    </>
  );
};

export default Home;
