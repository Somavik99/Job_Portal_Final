import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Server response:", response);
      const { data } = response;
      if (data && data.message) {
        toast.success(data.message);
        // Redirect to dashboard or another page upon successful login
      } else {
        toast.error("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred during login.");
      }
    }
  };

  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <h3>Login to your account</h3>
          </div>
          <form>
            <div className="inputTag">
              <label>Login As</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              <label>Email Address</label>
              <div>
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill />
              </div>
            </div>
            <button type="submit" onClick={handleLogin}>
              Login
            </button>
            <Link to={"/register"}>Register Now</Link>
            {/* Add forgot password link */}
            <Link to={"/forgot-password"}>Forgot Password?</Link>
          </form>
        </div>
        <div className="banner">
          <img src="/login.png" alt="login" />
        </div>
      </section>
    </>
  );
};

export default Login;
