import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../store/features/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigate();
  const disptach = useDispatch();
  const { error, success } = useSelector((state) => state.auth);

  useEffect(() => {
    if (success) {
      setEmail("");
      setPassword("");
      toast.success("Login Success");
      navigation("/");
    }
    if (error) {
      toast.error(error);
    }
  }, [disptach, navigation, success, error]);

  const handleSubmit = () => {
    if (!email || !password) {
      return toast.error("Please Provide All Fields");
    }

    disptach(login({ email, password }));
    disptach(reset());
    navigation("/")
  };
  return (
    <>
      <div
        className=" d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "90vh" }}
      >
        <h1>ADMIN PANEL</h1>
        <div className="w-25">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
