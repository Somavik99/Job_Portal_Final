import React from 'react'
import "../Css/homejob.css"

const Jobshow = () => {
  return (
    <section className="Container-job">
          <h1 style={{ textAlign: 'center', marginTop: '50px', fontSize: '40px', color: 'orange' }}>
          Our Job CATEGORIES
          </h1><br></br>
          <div className="Card__container">
            <section className="Card">
              <div>
                <img src="./Assets/adobe.png" alt="adobe" />
                <p>Adobe India</p>
              </div>
              <div>
                <p>
                  <i className="bi bi-geo-fill"></i>Location:
                  <span id="Location">Bangalore, India</span>
                </p>
                <p><i className="bi bi-people-fill"></i>Vacancies: <span>2</span></p>
              </div>
              <div>
                <p>
                  <i className="bi bi-cash-stack"></i>Salary:
                  <span>Rs. 500,000 - 700,000</span>
                </p>
              </div><br></br>
              <button className="see__more">View Details</button>
            </section>

            
          </div>
          
        </section>
  )
}

export default Jobshow