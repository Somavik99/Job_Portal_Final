
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How This portal Works</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p>Create Account</p>
              <p>
                 By clicking on create Account
              </p>
            </div>
            <div className="card" style={{borderRadius:"10px"}}>
              <MdFindInPage />
              <p>Find a Job/Post a Job</p>
              <p>
                 After creating Account go to the job serch option or job post option
              </p>
            </div>
            <div className="card">
              <IoMdSend />
              <p>Apply For Job/Recruit Suitable Candidates</p>
              <p>
                After finding a job you can apply it by adding details
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
