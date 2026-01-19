import React from "react";
import Layout from "../components/Layout";

const Home = () => {
  return (
    <Layout>
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "80vh" }}
      >
        <h4 className="bg-success text-light px-3 py-2 rounded-2">
          Car Rental App
        </h4>
        <h1>Welcome Admin 👋</h1>
        <p>for any assistance please call the developer</p>
        <p>
          <i className="fa-solid fa-phone"></i> : 0123456789
        </p>
      </div>
    </Layout>
  );
};

export default Home;
