import React, { useEffect, useState } from "react";
import AuthImage from "../../assets/images/car.gif";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../store/features/authSlice";
const Register = () => {
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const navigation = useNavigate();
  const disptach = useDispatch();
  const { error, success } = useSelector((state) => state.auth);

  useEffect(() => {
    if (success) {
      setUname("");
      setEmail("");
      setPassword("");
      setPhone("");
      toast.success("Regitration Success");
      navigation("/login");
    }
    if (error) {
      toast.error(error);
    }
  }, [disptach, navigation, success, error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!uname || !email || !password || !phone) {
      return toast.error("Please Provide All Fields");
    }
    // console.log("auth form data", uname + email + phone + password);
    disptach(register({ uname, email, password, phone }));
    disptach(reset());
    Navigate("/login");
  };

  return (
    <>
      <div className="container p-4">
        <div className="row">
          <div className="col-md-7">
            <img
              src={AuthImage}
              alt="auth"
              className="rounded"
              height={"100%"}
              width={"100%"}
            />
          </div>
          <div className="col-md-5 bg-light rounded-3 p-4">
            <h3 className="mb-3 text-center text-dark mt-3">
              Registration Form
            </h3>
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">
                Enter your Name
              </label>
              <input
                type="text"
                value={uname}
                onChange={(e) => setUname(e.target.value)}
                className="form-control"
                id="exampleInputName"
                aria-describedby="nameHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputphone" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
                id="exampleInputPhone"
                aria-describedby="phoneHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassowrd"
                aria-describedby="passwordHelp"
              />
            </div>
            <button className="btn btn-primary w-100" onClick={handleSubmit}>
              Register Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
