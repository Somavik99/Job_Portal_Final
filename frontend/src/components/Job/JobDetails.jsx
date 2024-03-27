import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { Context } from "../../main";
const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
        console.log(res.data.job);
      })
      .catch((error) => {
        console.warn(error.message);
        navigateTo("/notfound");
      });

      if (!isAuthorized) {
        navigateTo("/login");
      }   
  },[id, isAuthorized, navigateTo]);

  const HandleBackRouting = ()=>{
    navigateTo("/job/getall")
  }



  return (
    <section className="jobDetail page">
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "660px",
            marginRight: "100px",
            textAlign: "center",
            padding:"0 12px"
          }}
        >
          <button className="Back__button" onClick={HandleBackRouting}>
            <MdArrowBack size="40"/>
          </button>
          <h3>Job Details</h3>
        </div>
        <div className="banner">
          <p>
            Title: <span> {job.title}</span>
          </p>
          <p>
            Category: <span>{job.category}</span>
          </p>
          <p>
            Country: <span>{job.country}</span>
          </p>
          <p>
            City: <span>{job.city}</span>
          </p>
          <p>
            Location: <span>{job.location}</span>
          </p>
          <p>
            Description: <span>{job.description}</span>
          </p>
          <p>
            Job Posted On: <span>{job.jobPostedOn}</span>
          </p>
          <p>
            Salary:{" "}
            {job.fixedSalary ? (
              <span>{job.fixedSalary}</span>
            ) : (
              <span>
                {job.salaryFrom} - {job.salaryTo}
              </span>
            )}
          </p>
          {user && user.role === "Employer" ? (
            <></>
          ) : (
            <Link to={`/application/${job._id}`}>Apply Now</Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
