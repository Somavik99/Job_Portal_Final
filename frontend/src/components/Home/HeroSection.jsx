import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "0",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "0",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "0",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <>
      <div className="heroSection">
      <div className="container">
  <div className="title">
    <p style={{ fontSize: '3.2vw', fontWeight: 700 }}>
      Trying to find your favourite jobs. Here You will find{' '}
      <span style={{ color: 'orange' }}>1000+</span> opportunities depending on what you prefer.
    </p>
    
  </div>
  
  <div className="image">
    <img src="/man-with-join-us-sign-for-open-recruitment.png" alt="hero" />
  </div>
</div>

        <div className="details">
          {details.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="icon">{element.icon}</div>
                <div className="content">
                  <p>{element.title}</p>
                  <p>{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
