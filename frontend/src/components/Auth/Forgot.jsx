import React, { useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import { ToastContainer } from 'react-toastify';
import { Link, Navigate } from 'react-router-dom';
// import { FaPencilAlt } from 'react-icons/fa';
import { MdOutlineMailOutline } from 'react-icons/md';
import { RiLock2Fill } from 'react-icons/ri';
import { FiKey } from 'react-icons/fi'; // Icon for OTP
// import { Context } from "../../main";
import "../Auth/forgot.css"

const Forgot = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [sentOTP, setSentOTP] = useState(false);

    const handleSendOtp = async () => {
        try {
            const response = await axios.post(
                'http://localhost:4000/api/v1/user/send-otp',
                {
                    email,
                },
                { withCredentials: true }
            );

            if (response) {
                toast.success('OTP sent successfully', {
                    position: 'bottom-right',
                });
                setSentOTP(true);
            } else {
                toast.error('Failed to send OTP', {
                    position: 'bottom-right',
                });
            }
        } catch (ex) {
            console.error(ex);
            toast.error('Failed to send OTP', {
                position: 'bottom-right',
            });
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const response = await axios.post(
                'http://localhost:4000/api/v1/user/verify-otp',
                {
                    email: email,
                    otp: otp,
                    password: newPassword,
                    updateUser: true
                },
                { withCredentials: true }
            );
            console.log(response)

            if (response) {
                toast.success('OTP Verified', {
                    position: 'bottom-right',
                });
                return <Navigate to="/" />;
            } else {
                toast.error('Invalid OTP', {
                    position: 'bottom-right',
                });
            }
        } catch (ex) {
            console.error(ex);
        }
    };

    return (
        <section className="authPage">
            <div className="container forgotcontainer" >
                <h2>Forgot Password</h2>
                <form>
                    <div>
                        <label htmlFor="email">Email</label>
                        <div className='inputfield'>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <MdOutlineMailOutline className='icon'/>
                        </div>
                    </div>
                    <div >
                        <label htmlFor="newPassword">New Password</label>
                        <div className='inputfield'>
                            <input
                                type="password"
                                name="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <RiLock2Fill className='icon'/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="otp">OTP</label>
                        <div className='inputfield'>
                            <input
                                type="text"
                                name="otp"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <FiKey className='icon'/> 
                        </div>
                    </div>

                    {/* Conditionally render Send OTP button */}
                    {!sentOTP && (
                        <button type="button" onClick={handleSendOtp}>
                            Send OTP
                        </button>
                    )}

                    {/* Conditionally render Verify OTP button */}
                    {sentOTP && (
                        <button type="button" onClick={handleVerifyOtp}>
                            Verify OTP
                        </button>
                    )}
                    <Link to={"/login"}>Login Now</Link>
                </form>
                <ToastContainer />
            </div>
        </section>
    );
};

export default Forgot;
