
import React, { useEffect, useState } from "react";
import AuthImage from "../../assets/images/car.gif";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../store/features/authSlice";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const navigate = useNavigate(); // renamed here
const dispatch = useDispatch(); // fixed spelling

  //login handler
  const handleSubmit = () => {
    // e.preventDefault();
    if (!email || !password) {
      return toast.error("Please enter email or password");
    }
    // console.log("auth form data", +email + password);
    dispatch(login({ email, password }));
    navigate("/cars")
  };

  const { error, success } = useSelector((state) => state.auth);

  useEffect(() => {
    if (success) {
      setEmail("");
      setPassword("");
      toast.success("Login Success");
      navigate("/cars");
      dispatch(reset());
    }
    if (error) {
      toast.error(error);
    }
  }, [success,  error,navigate, dispatch]);

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
          <div className="col-md-5 bg-light rounded-3 p-4 d-flex flex-column justify-content-center">
            <h3 className="mb-3 text-center text-dark mt-3">Login Form</h3>

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
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

