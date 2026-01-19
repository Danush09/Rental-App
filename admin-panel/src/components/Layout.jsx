import React from "react";
import Menus from "./Menus";

const Layout = ({ children }) => {
  return (
    <>
      <div className="row" style={{ minHeight: "98vh" }}>
        <div className="col-md-2 bg-dark text-light">
          <Menus />
        </div>
        <div className="col-md-10 bg-light">{children}</div>
      </div>
    </>
  );
};

export default Layout;
