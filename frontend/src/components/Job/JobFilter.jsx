import { useState } from "react";
import "./JobFilter.css";

const JobFilter = ({ setIsFilter, FilterJobData }) => {
  const [SelectedOptions, setSelectedOptions] = useState({
    category: "",
    salaryRange: [],
    jobType: [],
    postingDuration: [],
  });

  const HandleCategoryChange = (e) => {
    setSelectedOptions({ ...SelectedOptions, category: e.target.value });
  };

  const HandleSalaryRangeChange = (e) => {
    const value = e.target.value;
    const IsChecked = e.target.checked;
    let newSalaryRange;
    if (IsChecked) {
      newSalaryRange = [...SelectedOptions.salaryRange, value];
    } else {
      newSalaryRange = SelectedOptions.salaryRange.filter(
        (salary) => salary !== value
      );
    }
    setSelectedOptions({ ...SelectedOptions, salaryRange: newSalaryRange });
  };

  const HandleJobTypeChange = (e) => {
    const value = e.target.value;
    const IsChecked = e.target.checked;
    let newJobType;
    if (IsChecked) {
      newJobType = [...SelectedOptions.jobType, value];
    } else {
      newJobType = SelectedOptions.jobType.filter((job) => job !== value);
    }

    setSelectedOptions({ ...SelectedOptions, jobType: newJobType });
  };

  const HandlePostingDuration = (e) => {
    const value = e.target.value;
    const IsChecked = e.target.checked;
    let newPostingDuration;
    if (IsChecked) {
      newPostingDuration = [...SelectedOptions.postingDuration, value];
    } else {
      newPostingDuration = SelectedOptions.postingDuration.filter(
        (duration) => duration !== value
      );
    }

    setSelectedOptions({ ...SelectedOptions, postingDuration: newPostingDuration });
  };

  const FetchData = () => {
    setIsFilter(false);

    FilterJobData(SelectedOptions);
  };

  return (
    <div className="Filter__Container">
      <h4 style={{ textAlign: "center", margin: "5px" }}>Filter</h4>
      <div className="Filters">
        <section>
          <h6 style={{ textAlign: "center" }}>Job Category</h6>
          <div>
            <select
              name="Category"
              className="Select__options"
              onChange={HandleCategoryChange}
            >
              <option>Select Category</option>
              <option value="Graphics&Design">Graphics & Design</option>
              <option value="MobileAppDevelopment">
                Mobile App Development
              </option>
              <option value="FrontendWebDevelopment">
                Frontend Web Development
              </option>
              <option value="MERNSTACKDevelopment">
                MERN STACK Development
              </option>
              <option value="Account&Finance">Account & Finance</option>
              <option value="ArtificialIntelligence">
                Artificial Intelligence
              </option>
              <option value="VideoAnimation">Video Animation</option>
              <option value="MEANSTACKDevelopment">
                MEAN STACK Development
              </option>
              <option value="MEVNSTACKDevelopment">
                MEVN STACK Development
              </option>
              <option value="DataEntryOperator">Data Entry Operator</option>
            </select>
          </div>
        </section>
        <section>
          <h6 style={{ textAlign: "center" }}>Salary Range(LPA)</h6>
          <div>
            <div>
              <input
                type="checkbox"
                name=""
                value="0-200000"
                id="Salary1"
                onChange={HandleSalaryRangeChange}
              />
              <label htmlFor="Salary1">Rs. 0 - 2,00,000</label>
            </div>
            <div>
              <input
                type="checkbox"
                name=""
                id="Salary2"
                value="210000-400000"
                onChange={HandleSalaryRangeChange}
              />
              <label htmlFor="Salary2">Rs. 2,10,000 - 4,00,000</label>
            </div>
            <div>
              <input
                type="checkbox"
                name=""
                id="Salary1"
                value="410000-600000"
                onChange={HandleSalaryRangeChange}
              />
              <label htmlFor="Salary3">Rs. 4,10,000 - 6,00,000</label>
            </div>
            <div>
              <input
                type="checkbox"
                name=""
                value="610000&lt;&lt;"
                id="Salary4"
                onChange={HandleSalaryRangeChange}
              />
              <label htmlFor="Salary4">Rs. 6,10,000 &lt;&lt;</label>
            </div>
          </div>
        </section>
        <section>
          <h6 style={{ textAlign: "center" }}>Job Type</h6>
          <div>
            <div>
              <input
                type="checkbox"
                name=""
                value="FullTime"
                id="FullTime"
                onChange={HandleJobTypeChange}
              />
              <label htmlFor="FullTime">Full-time</label>
            </div>
            <div>
              <input
                type="checkbox"
                name=""
                value="PartTime"
                id="PartTime"
                onChange={HandleJobTypeChange}
              />
              <label htmlFor="PartTime">Part-time</label>
            </div>
            <div>
              <input
                type="checkbox"
                name=""
                value="Intern"
                id="Intern"
                onChange={HandleJobTypeChange}
              />
              <label htmlFor="Intern">Intern</label>
            </div>
          </div>
        </section>
        <section>
          <h6 style={{ textAlign: "center" }}>Posting Duration</h6>
          <div>
            <div>
              <input
                type="checkbox"
                name=""
                value="LastTwoDays"
                id="LastTwoDays"
                onChange={HandlePostingDuration}
              />
              <label htmlFor="LastTwoDays">Last 2 Days</label>
            </div>
            <div>
              <input
                type="checkbox"
                name=""
                value="LastSevenDays"
                id="LastSevenDays"
                onChange={HandlePostingDuration}
              />
              <label htmlFor="LastSevenDays">Last 7 Days</label>
            </div>
            <div>
              <input
                type="checkbox"
                name=""
                id="LastTenDays"
                value="LastTenDays"
                onChange={HandlePostingDuration}
              />
              <label htmlFor="LastTenDays">Last 10 Days</label>
            </div>
            <div>
              <input
                type="checkbox"
                name=""
                id="LastFifteenDays"
                value="LastFifteen"
                onChange={HandlePostingDuration}
              />
              <label htmlFor="LastFifteen Days">Last 15 Days</label>
            </div>
            <div>
              <input
                type="checkbox"
                name=""
                value="LastThirtyDays"
                id="LastThirtyDays"
                onChange={HandlePostingDuration}
              />
              <label htmlFor="LastThirtyDays">Last 30 Days</label>
            </div>
          </div>
        </section>
      </div>

      <button className="Category__applyBtn" onClick={FetchData}>
        Apply
      </button>
    </div>
  );
};

export default JobFilter;
