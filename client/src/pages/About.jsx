import React from "react";

const About = () => {
  return (
    <>
      <div className="mt-3 p-4" style={{ minHeight: "80vh" }}>
        {/* <h1 className="text-center mb-3">ABOUT US</h1> */}
        <div className="row">
          <div className="col-md-6">
            <img src="https://www.ecorentacar.com/wp-content/uploads/2024/08/self-drive-car-rental-service.jpeg"
              className="rounded-2"
              alt="about" height={'100%'} width={'100%'} />
          </div>
          <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
            <h4>Car Rental App</h4>
            <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa mollitia recusandae suscipit reprehenderit officia accusantium corporis dolorum quo, tenetur voluptatibus harum esse reiciendis porro enim totam. Vero, voluptatum blanditiis! Qui facilis eaque iste aut cupiditate tempora voluptatum esse. Eveniet fugit atque earum voluptate dolore nostrum labore totam optio odio dolor fugiat harum quod quis, sapiente, eaque reprehenderit omnis ipsum commodi facere? Quo consequatur, omnis odio velit ad iure consequuntur incidunt quidem esse perspiciatis officia alias eaque doloremque est, cupiditate rem aliquam, deleniti quam quas iusto illo animi ab aperiam. Vitae officiis nihil obcaecati sed provident voluptates iure necessitatibus minus recusandae!</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
