import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import "../Css/extra.css";
 

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/job/getall", { withCredentials: true });
        setJobs(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
    }
  }, [isAuthorized, navigateTo]);

  return (
    <section className="Container-job">
    <h1 style={{ textAlign: 'center', marginTop: '50px', fontSize: '40px', color: 'orange' }}>
      Recent Jobs
    </h1><br></br>
      
          <div className="Card__container">
          {jobs.jobs &&
        jobs.jobs.map((element) => (
            <section className="Card">
              <div>
                <p>{element.companyName}</p>
              </div>
              <div>
              <p class="job-info"><i className="bi bi-geo-fill"></i>Companay Name: <span id="Location">{element.companyName}</span></p>
              <p class="job-info"><i className="bi bi-geo-fill"></i>Title: <span id="Location">{element.title}</span></p>
                <p class="job-info"><i className="bi bi-people-fill"></i>category: <span>{element.category}</span></p>
                <p class="job-info"><i className="bi bi-geo-fill"></i>Location: <span id="Location">{element.location}</span></p>
                <p class="job-info"><i className="bi bi-people-fill"></i>Vacancies: <span>{element.vacancies}</span></p>
                <p class="job-info"><i className="bi bi-geo-fill"></i>Salary: <span id="Location">{element.fixedSalary}{element.salaryFrom}-{element.salaryTo} </span></p>
    
               </div>
              <div>
               </div> 
               <button className="btn_area button">
              <Link to={`/job/${element._id}`}>View Details</Link></button>
            </section>
             ))}
          </div>
       
      
    </section>
  );
};

export default Jobs;
