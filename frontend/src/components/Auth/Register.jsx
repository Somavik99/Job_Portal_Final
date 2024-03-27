import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { FiKey } from "react-icons/fi"; // Icon for OTP
import { Link, Navigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [otpValue, setOtpValue] = useState(""); // State for OTP
  const [sentOTP, setSentOTP] = useState(false); // State to track whether OTP is sent

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (!sentOTP) {
        toast.error("Please send OTP first.");
        return;
      }

      // Verify OTP
      if (!otpValue) {
        toast.error("Please enter OTP.");
        return;
      }

      const response = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        { name, phone, email, role, password, otp: otpValue }, // Include OTP in registration data
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Server response:", response); // Debugging message
      const { data } = response;
      if (data && data.message) {
        toast.success(data.message);
      } else {
        toast.error("Unexpected response from server.");
      }
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      console.error("Registration failed:", error); // Debugging message
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred during registration.");
      }
    }
  };

  const handleSendOtp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/send-otp",
        {
          email,
        },
        { withCredentials: true }
      );

      if (response) {
        toast.success("OTP sent successfully", {
          position: "bottom-right",
        });
        setSentOTP(true);
      } else {
        toast.error("Failed to send OTP", {
          position: "bottom-right",
        });
      }
    } catch (ex) {
      console.log(ex);
      toast.error("Failed to send OTP", {
        position: "bottom-right",
      });
    }
  };

  if (isAuthorized) {
    return <Navigate to={'/'} />;
  }

  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <h3>Create a new account</h3>
          </div>
          <form>
            <div className="inputTag">
              <label>Register As</label>
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
              <label>Name</label>
              <div>
                <input
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FaPencilAlt />
              </div>
            </div>
            <div className="inputTag">
              <label>Email Address</label>
              <div>
                <input
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              <label>Phone Number</label>
              <div>
                <input
                  type="number"
                  placeholder="Enter Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <FaPhoneFlip />
              </div>
            </div>
            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill />
              </div>
            </div>

            {/* OTP input field */}
            <div className="inputTag">
              <label>Enter OTP</label>
              <div>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value)}
                />
                <FiKey /> {/* Icon for OTP */}
              </div>
            </div>

            {/* Conditionally render OTP verification button */}
            {sentOTP && (
              <button type="button" onClick={handleRegister}>


                Register
              </button>
            )}

            {/* Conditionally render OTP sending button */}
            {!sentOTP && (
              <button type="button" onClick={handleSendOtp}>
                Send OTP
              </button>
            )}

            <Link to={"/login"}>Login Now</Link>
          </form>
        </div>
        <div className="banner">
          <img src="/register.png" alt="login" />
        </div>
      </section>
    </>
  );
};

export default Register;
