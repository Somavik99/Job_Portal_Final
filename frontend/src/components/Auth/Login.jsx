import React, { useContext, useState, useEffect } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { GoogleLogin } from 'react-google-login'; // Import GoogleLogin component
import { gapi } from 'gapi-script';

let clientId = '263163328650-ra32bng2gad5364jc9g6oalt16kioml5.apps.googleusercontent.com'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: { clientId },
        scope: ""
      })
    }
    gapi.load('client:auth2', start)
  }, [])

  const onSuccess = async(e) => {
    let res = await axios.post(
      "http://localhost:4000/login",
      {
        name: e.profileObj.name,
        type: "google",
        email: e.profileObj.email,
        tokenId: e.tokenId,
        googleId: e.googleId
      },
      { withCredentials: true }
    );
    console.log(res.data)
    if (!res.data.created) {
      // console.log(res)
      // const { name, email, phone, password } = res.errors;
      // if (name) generateError(name);
      // else if (email) generateError(email);
      // else if (phone) generateError(phone);
      // else if (password) generateError(password);
    } else {
      return <Navigate to={'/'} />
    }
  }
  const onFailure = (e) => {
    console.log(e)
    toast.error(e, {
      position: "bottom-right",
    });
  }


  if (isAuthorized) {
    return <Navigate to={'/'} />
  }

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
            <GoogleLogin
              clientId={clientId}
              buttonText="Continue with Google"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
            />            
            <Link to={"/register"}>Register Now</Link>
            {/* Link to the Forgot Password page */}
            <span>
              Forgot password ?<Link to="/forgot">Click here</Link>
            </span>
            
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
