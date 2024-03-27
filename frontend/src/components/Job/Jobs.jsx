import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { GoLocation } from "react-icons/go";
import { FaSuitcase } from "react-icons/fa";
import { IoFilterCircleSharp } from "react-icons/io5";
import "./Jobs.css";
import JobFilter from "./JobFilter";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [IsFilter, setIsFilter] = useState(false);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  const FetchJobData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/job/getall", {
        withCredentials: true,
      });
      setJobs(res.data.jobs);
    } catch (error) {
      console.warn(error.message);
    }
  };

  useEffect(() => {
    FetchJobData();
  }, []);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const FilterJobData = (filterData) => {
    let filteredJobs = [...jobs];
    if (filterData.category) {
      filteredJobs = filteredJobs.filter(
        (job) => job.category === filterData.category
      );
    }

    if (filterData.salaryRange.length > 0) {
      filteredJobs = filteredJobs.filter((job) => {
        const JobSalary = parseFloat(job.salary);
        return filterData.salaryRange.some((range) => {
          const [min, max] = range
            .split("")
            .map((s) => parseFloat(s.replace(/[^0-9.]/g, "")));
          return JobSalary >= min && JobSalary <= max;
        });
      });
    }

    if (filterData.jobType.length > 0) {
      filteredJobs = filteredJobs.filter((job) =>
        filterData.jobType.includes(job.type)
      );
    }

    if (filterData.postingDuration.length > 0) {
      const today = new Date();
      const InOneDay = 1000 * 60 * 60 * 24;
      filteredJobs = filteredJobs.filter((job) => {
        const jobDate = new Date(job.postingData);
        const DaysCount = Math.round((today - jobDate) / InOneDay);
        return filterData.postingDuration.includes(DaysCount.toString());
      });
    }
    setJobs(filteredJobs);
  };

  console.log("Jobs:", jobs);

  const HandleFilters = () => {
    setIsFilter(true);
  };

  return (
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>
        <div className="Search__container">
          <div>
            <GoLocation />
            <input type="text" placeholder="Location..." />
          </div>
          <div>
            <FaSuitcase />
            <input type="text" placeholder="Job Title..." />
          </div>
          <div>
            <button style={{ marginLeft: "10px", fontSize: "20px" }}>
              Search
            </button>

            <button style={{ marginLeft: "10px" }} onClick={HandleFilters}>
              <IoFilterCircleSharp size="20" />
            </button>
          </div>
        </div>
        {IsFilter ? (
          <div style={{ position: "fixed", top: "350px" }}>
            <JobFilter
              setIsFilter={setIsFilter}
              FilterJobData={FilterJobData}
            />
          </div>
        ) : null}
        <div className="banner">
          {Array.isArray(jobs) &&
            jobs.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  <Link to={`/job/${element._id}`}>Job Details</Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
